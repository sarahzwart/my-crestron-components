// src/services/ch5Service.ts

declare global {
  interface Window {
    CrComLib: any;
  }
}

interface Subscription {
  type: 'b' | 'n' | 's';
  id: string;
}

class CH5Service {
  private subscriptions: Map<string, Subscription> = new Map();
  private isInitialized: boolean = false;

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
    try {
      const state = this.lib.getState('string', signalName);
      return state !== null ? (state as string) : null;
    } catch (error) {
      console.error(`Error getting string state for ${signalName}:`, error);
      return null;
    }
  }

  // ========== SUBSCRIBE (listen to FEEDBACK signals) ==========
  subscribeBool(signalName: string, callback: (value: boolean) => void): string {
    if (!this.isInitialized) return '';
    
    try {
      const subscriptionId = this.lib.subscribeState('b', signalName, callback);
      
      this.subscriptions.set(signalName, {
        type: 'b',
        id: subscriptionId
      });
      
      console.log(`Subscribed to boolean [${signalName}]`);
      return subscriptionId;
    } catch (error) {
      console.error(`Error subscribing to boolean ${signalName}:`, error);
      return '';
    }
  }

  subscribeNumeric(signalName: string, callback: (value: number) => void): string {
    if (!this.isInitialized) return '';
    
    try {
      const subscriptionId = this.lib.subscribeState('n', signalName, callback);
      
      this.subscriptions.set(signalName, {
        type: 'n',
        id: subscriptionId
      });
      
      console.log(`Subscribed to numeric [${signalName}]`);
      return subscriptionId;
    } catch (error) {
      console.error(`Error subscribing to numeric ${signalName}:`, error);
      return '';
    }
  }

  subscribeString(signalName: string, callback: (value: string) => void): string {
    if (!this.isInitialized) return '';
    
    try {
      const subscriptionId = this.lib.subscribeState('s', signalName, callback);
      
      this.subscriptions.set(signalName, {
        type: 's',
        id: subscriptionId
      });
      
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
    
    try {
      console.log(`Publishing string [${signalName}]:`, value);
      this.lib.publishEvent('s', signalName, value);
    } catch (error) {
      console.error(`Error publishing string ${signalName}:`, error);
    }
  }

  unsubscribe(signalName: string): void {
    const subscription = this.subscriptions.get(signalName);
    
    if (!subscription) {
      console.warn(`No subscription found for [${signalName}]`);
      return;
    }

    try {
      this.lib.unsubscribeState(subscription.type, signalName, subscription.id);
      this.subscriptions.delete(signalName);
      console.log(`Unsubscribed from [${signalName}]`);
    } catch (error) {
      console.error(`Error unsubscribing from ${signalName}:`, error);
    }
  }

  cleanup(): void {
    console.log('Cleaning up all CH5 subscriptions...');
    this.subscriptions.forEach((subscription, signalName) => {
      try {
        this.lib.unsubscribeState(subscription.type, signalName, subscription.id);
      } catch (error) {
        console.error(`Error cleaning up ${signalName}:`, error);
      }
    });
    this.subscriptions.clear();
  }
}

export default new CH5Service();