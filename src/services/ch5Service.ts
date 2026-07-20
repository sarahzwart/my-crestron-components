// src/services/ch5Service.ts

declare global {
  interface Window {
    CrComLib: any;
    ch5Service?: CH5Service;
  }
}

interface Subscription {
  type: 'b' | 'n' | 's';
  id: string;
}

type MockValue = boolean | number | string;

class CH5Service {
  // One signal name can have more than one active listener at once — e.g. a
  // component's own feedback binding and a separate tracker elsewhere both
  // legitimately watch the same signal simultaneously. unsubscribe() must
  // remove only the caller's own subscriptionId, never every listener
  // registered for that signal name — otherwise one component unmounting
  // silently kills a completely unrelated component's still-active
  // subscription, which then never fires again (looks like FB got
  // permanently "stuck").
  private subscriptions: Map<string, Subscription[]> = new Map();
  private isInitialized: boolean = false;

  // Fallback in-memory bus used when there's no real CrComLib bridge (e.g.
  // testing in a plain browser without a processor attached). Lets
  // publishBool/subscribeBool etc. actually work end-to-end for local
  // testing instead of silently no-op'ing. Keyed by a unique subscription
  // id (not just signal name) for the same reason as above — multiple
  // independent listeners per signal must be removable individually.
  private mockState: Map<string, MockValue> = new Map();
  private mockListeners: Map<string, Map<string, (value: MockValue) => void>> = new Map();
  private mockIdCounter = 0;

  private get lib(): any {
    return (window as any).CrComLib;
  }

  async init(): Promise<void> {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    try {
      this.isInitialized = true;
      console.log('CH5 Service ready');

      if (this.lib) {
        console.log('Using @crestron/ch5-crcomlib version:', this.lib.version);
      } else {
        console.log('No CrComLib bridge found — using local mock signals for testing.');
      }

      return Promise.resolve();
    } catch (error) {
      console.error('CH5 Service initialization failed:', error);
      throw error;
    }
  }

  // ========== GET CURRENT STATE ==========
  getBoolState(signalName: string): boolean | null {
    if (!this.isInitialized) return null;
    if (!this.lib) return (this.mockState.get(signalName) as boolean) ?? null;
    try {
      const state = this.lib.getState('boolean', signalName);
      return state !== null ? (state as boolean) : null;
    } catch (error) {
      console.error(`Error getting boolean state for ${signalName}:`, error);
      return null;
    }
  }

  getNumericState(signalName: string): number | null {
    if (!this.isInitialized) return null;
    if (!this.lib) return (this.mockState.get(signalName) as number) ?? null;
    try {
      const state = this.lib.getState('number', signalName);
      return state !== null ? (state as number) : null;
    } catch (error) {
      console.error(`Error getting numeric state for ${signalName}:`, error);
      return null;
    }
  }

  getStringState(signalName: string): string | null {
    if (!this.isInitialized) return null;
    if (!this.lib) return (this.mockState.get(signalName) as string) ?? null;
    try {
      const state = this.lib.getState('string', signalName);
      return state !== null ? (state as string) : null;
    } catch (error) {
      console.error(`Error getting string state for ${signalName}:`, error);
      return null;
    }
  }

  private trackSubscription(signalName: string, subscription: Subscription): void {
    const existing = this.subscriptions.get(signalName) ?? [];
    existing.push(subscription);
    this.subscriptions.set(signalName, existing);
  }

  // ========== SUBSCRIBE (listen to FEEDBACK signals) ==========
  subscribeBool(signalName: string, callback: (value: boolean) => void): string {
    if (!this.isInitialized) return '';
    if (!this.lib) return this.mockSubscribe(signalName, callback as (value: MockValue) => void);

    try {
      const subscriptionId = this.lib.subscribeState('b', signalName, callback);
      this.trackSubscription(signalName, { type: 'b', id: subscriptionId });
      console.log(`Subscribed to boolean [${signalName}]`);
      return subscriptionId;
    } catch (error) {
      console.error(`Error subscribing to boolean ${signalName}:`, error);
      return '';
    }
  }

  subscribeNumeric(signalName: string, callback: (value: number) => void): string {
    if (!this.isInitialized) return '';
    if (!this.lib) return this.mockSubscribe(signalName, callback as (value: MockValue) => void);

    try {
      const subscriptionId = this.lib.subscribeState('n', signalName, callback);
      this.trackSubscription(signalName, { type: 'n', id: subscriptionId });
      console.log(`Subscribed to numeric [${signalName}]`);
      return subscriptionId;
    } catch (error) {
      console.error(`Error subscribing to numeric ${signalName}:`, error);
      return '';
    }
  }

  subscribeString(signalName: string, callback: (value: string) => void): string {
    if (!this.isInitialized) return '';
    if (!this.lib) return this.mockSubscribe(signalName, callback as (value: MockValue) => void);

    try {
      const subscriptionId = this.lib.subscribeState('s', signalName, callback);
      this.trackSubscription(signalName, { type: 's', id: subscriptionId });
      console.log(`Subscribed to string [${signalName}]`);
      return subscriptionId;
    } catch (error) {
      console.error(`Error subscribing to string ${signalName}:`, error);
      return '';
    }
  }

  // ========== PUBLISH (send EVENT/COMMAND signals) ==========
  publishBool(signalName: string, value: boolean): void {
    if (!this.isInitialized) {
      console.warn('CH5 not initialized');
      return;
    }
    if (!this.lib) return this.mockPublish(signalName, value);

    try {
      console.log(`Publishing boolean [${signalName}]:`, value);
      this.lib.publishEvent('b', signalName, value);
    } catch (error) {
      console.error(`Error publishing boolean ${signalName}:`, error);
    }
  }

  publishNumeric(signalName: string, value: number): void {
    if (!this.isInitialized) {
      console.warn('CH5 not initialized');
      return;
    }
    if (!this.lib) return this.mockPublish(signalName, value);

    try {
      console.log(`Publishing numeric [${signalName}]:`, value);
      this.lib.publishEvent('n', signalName, value);
    } catch (error) {
      console.error(`Error publishing numeric ${signalName}:`, error);
    }
  }

  publishString(signalName: string, value: string): void {
    if (!this.isInitialized) {
      console.warn('CH5 not initialized');
      return;
    }
    if (!this.lib) return this.mockPublish(signalName, value);

    try {
      console.log(`Publishing string [${signalName}]:`, value);
      this.lib.publishEvent('s', signalName, value);
    } catch (error) {
      console.error(`Error publishing string ${signalName}:`, error);
    }
  }

  // subscriptionId is the value returned by subscribeBool/Numeric/String —
  // pass it back so only that specific listener is removed, leaving any
  // other subscriber to the same signal name untouched.
  unsubscribe(signalName: string, subscriptionId: string): void {
    if (!this.lib) {
      this.mockUnsubscribe(signalName, subscriptionId);
      return;
    }

    const subs = this.subscriptions.get(signalName);
    const index = subs?.findIndex((s) => s.id === subscriptionId) ?? -1;

    if (!subs || index === -1) {
      console.warn(`No subscription [${subscriptionId}] found for [${signalName}]`);
      return;
    }

    try {
      this.lib.unsubscribeState(subs[index].type, signalName, subscriptionId);
    } catch (error) {
      console.error(`Error unsubscribing from ${signalName}:`, error);
    }
    subs.splice(index, 1);
    if (subs.length === 0) this.subscriptions.delete(signalName);
    console.log(`Unsubscribed [${subscriptionId}] from [${signalName}]`);
  }

  cleanup(): void {
    if (!this.lib) {
      this.mockListeners.clear();
      return;
    }

    console.log('Cleaning up all CH5 subscriptions...');
    this.subscriptions.forEach((subs, signalName) => {
      subs.forEach((subscription) => {
        try {
          this.lib.unsubscribeState(subscription.type, signalName, subscription.id);
        } catch (error) {
          console.error(`Error cleaning up ${signalName}:`, error);
        }
      });
    });
    this.subscriptions.clear();
  }

  // ========== MOCK BUS (no CrComLib present) ==========
  private mockSubscribe(signalName: string, callback: (value: MockValue) => void): string {
    const subscriptionId = `mock-${++this.mockIdCounter}`;
    if (!this.mockListeners.has(signalName)) {
      this.mockListeners.set(signalName, new Map());
    }
    this.mockListeners.get(signalName)!.set(subscriptionId, callback);

    const current = this.mockState.get(signalName);
    if (current !== undefined) callback(current);

    console.log(`[mock] Subscribed [${subscriptionId}] to [${signalName}]`);
    return subscriptionId;
  }

  private mockUnsubscribe(signalName: string, subscriptionId: string): void {
    this.mockListeners.get(signalName)?.delete(subscriptionId);
  }

  private mockPublish(signalName: string, value: MockValue): void {
    this.mockState.set(signalName, value);
    console.log(`[mock] Publishing [${signalName}]:`, value);
    this.mockListeners.get(signalName)?.forEach((callback) => callback(value));
  }
}

const ch5Service = new CH5Service();

// Expose for manual testing from the browser console when there's no real
// processor attached, e.g.: ch5Service.publishBool("System.Power_FB", true)
// Not gated to dev builds — it's a harmless debug hook and needs to work on
// preview/production builds too, since those don't have a processor either.
window.ch5Service = ch5Service;

export default ch5Service;
