using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace contract_v1
{
    public interface IPhone
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Hangup;
        event EventHandler<UIEventArgs> Privacy;
        event EventHandler<UIEventArgs> Hold;
        event EventHandler<UIEventArgs> Keypad_Toggle;
        event EventHandler<UIEventArgs> Keypad_1;
        event EventHandler<UIEventArgs> Keypad_2;
        event EventHandler<UIEventArgs> Keypad_3;
        event EventHandler<UIEventArgs> Keypad_4;
        event EventHandler<UIEventArgs> Keypad_5;
        event EventHandler<UIEventArgs> Keypad_6;
        event EventHandler<UIEventArgs> Keypad_7;
        event EventHandler<UIEventArgs> Keypad_8;
        event EventHandler<UIEventArgs> Keypad_9;
        event EventHandler<UIEventArgs> Keypad_0;
        event EventHandler<UIEventArgs> Keypad_Star;
        event EventHandler<UIEventArgs> Keypad_Pound;
        event EventHandler<UIEventArgs> Keypad_Dial;
        event EventHandler<UIEventArgs> Keypad_Backspace;

        void Hangup_FB(PhoneBoolInputSigDelegate callback);
        void Privacy_FB(PhoneBoolInputSigDelegate callback);
        void Hold_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_Toggle_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_1_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_2_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_3_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_4_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_5_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_6_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_7_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_8_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_9_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_0_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_Star_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_Pound_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_Dial_FB(PhoneBoolInputSigDelegate callback);
        void Keypad_Backspace_FB(PhoneBoolInputSigDelegate callback);

    }

    public delegate void PhoneBoolInputSigDelegate(BoolInputSig boolInputSig, IPhone phone);

    internal class Phone : IPhone, IDisposable
    {
        #region Standard CH5 Component members

        private ComponentMediator ComponentMediator { get; set; }

        public object UserObject { get; set; }

        public uint ControlJoinId { get; private set; }

        private IList<BasicTriListWithSmartObject> _devices;
        public IList<BasicTriListWithSmartObject> Devices { get { return _devices; } }

        #endregion

        #region Joins

        private static class Joins
        {
            internal static class Booleans
            {
                public const uint Hangup = 1;
                public const uint Privacy = 2;
                public const uint Hold = 3;
                public const uint Keypad_Toggle = 4;
                public const uint Keypad_1 = 5;
                public const uint Keypad_2 = 6;
                public const uint Keypad_3 = 7;
                public const uint Keypad_4 = 8;
                public const uint Keypad_5 = 9;
                public const uint Keypad_6 = 10;
                public const uint Keypad_7 = 11;
                public const uint Keypad_8 = 12;
                public const uint Keypad_9 = 13;
                public const uint Keypad_0 = 14;
                public const uint Keypad_Star = 15;
                public const uint Keypad_Pound = 16;
                public const uint Keypad_Dial = 17;
                public const uint Keypad_Backspace = 18;

                public const uint Hangup_FB = 1;
                public const uint Privacy_FB = 2;
                public const uint Hold_FB = 3;
                public const uint Keypad_Toggle_FB = 4;
                public const uint Keypad_1_FB = 5;
                public const uint Keypad_2_FB = 6;
                public const uint Keypad_3_FB = 7;
                public const uint Keypad_4_FB = 8;
                public const uint Keypad_5_FB = 9;
                public const uint Keypad_6_FB = 10;
                public const uint Keypad_7_FB = 11;
                public const uint Keypad_8_FB = 12;
                public const uint Keypad_9_FB = 13;
                public const uint Keypad_0_FB = 14;
                public const uint Keypad_Star_FB = 15;
                public const uint Keypad_Pound_FB = 16;
                public const uint Keypad_Dial_FB = 17;
                public const uint Keypad_Backspace_FB = 18;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Phone(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Hangup, onHangup);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Privacy, onPrivacy);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Hold, onHold);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_Toggle, onKeypad_Toggle);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_1, onKeypad_1);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_2, onKeypad_2);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_3, onKeypad_3);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_4, onKeypad_4);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_5, onKeypad_5);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_6, onKeypad_6);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_7, onKeypad_7);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_8, onKeypad_8);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_9, onKeypad_9);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_0, onKeypad_0);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_Star, onKeypad_Star);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_Pound, onKeypad_Pound);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_Dial, onKeypad_Dial);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Keypad_Backspace, onKeypad_Backspace);

        }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            Devices.Add(device);
            ComponentMediator.HookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            Devices.Remove(device);
            ComponentMediator.UnHookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
        }

        #endregion

        #region CH5 Contract

        public event EventHandler<UIEventArgs> Hangup;
        private void onHangup(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Hangup;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Privacy;
        private void onPrivacy(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Privacy;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Hold;
        private void onHold(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Hold;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_Toggle;
        private void onKeypad_Toggle(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_Toggle;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_1;
        private void onKeypad_1(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_1;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_2;
        private void onKeypad_2(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_2;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_3;
        private void onKeypad_3(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_3;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_4;
        private void onKeypad_4(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_4;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_5;
        private void onKeypad_5(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_5;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_6;
        private void onKeypad_6(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_6;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_7;
        private void onKeypad_7(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_7;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_8;
        private void onKeypad_8(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_8;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_9;
        private void onKeypad_9(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_9;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_0;
        private void onKeypad_0(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_0;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_Star;
        private void onKeypad_Star(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_Star;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_Pound;
        private void onKeypad_Pound(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_Pound;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_Dial;
        private void onKeypad_Dial(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_Dial;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Keypad_Backspace;
        private void onKeypad_Backspace(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Keypad_Backspace;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Hangup_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Hangup_FB], this);
            }
        }

        public void Privacy_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Privacy_FB], this);
            }
        }

        public void Hold_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Hold_FB], this);
            }
        }

        public void Keypad_Toggle_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_Toggle_FB], this);
            }
        }

        public void Keypad_1_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_1_FB], this);
            }
        }

        public void Keypad_2_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_2_FB], this);
            }
        }

        public void Keypad_3_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_3_FB], this);
            }
        }

        public void Keypad_4_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_4_FB], this);
            }
        }

        public void Keypad_5_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_5_FB], this);
            }
        }

        public void Keypad_6_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_6_FB], this);
            }
        }

        public void Keypad_7_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_7_FB], this);
            }
        }

        public void Keypad_8_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_8_FB], this);
            }
        }

        public void Keypad_9_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_9_FB], this);
            }
        }

        public void Keypad_0_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_0_FB], this);
            }
        }

        public void Keypad_Star_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_Star_FB], this);
            }
        }

        public void Keypad_Pound_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_Pound_FB], this);
            }
        }

        public void Keypad_Dial_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_Dial_FB], this);
            }
        }

        public void Keypad_Backspace_FB(PhoneBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Keypad_Backspace_FB], this);
            }
        }

        #endregion

        #region Overrides

        public override int GetHashCode()
        {
            return (int)ControlJoinId;
        }

        public override string ToString()
        {
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Phone", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Hangup = null;
            Privacy = null;
            Hold = null;
            Keypad_Toggle = null;
            Keypad_1 = null;
            Keypad_2 = null;
            Keypad_3 = null;
            Keypad_4 = null;
            Keypad_5 = null;
            Keypad_6 = null;
            Keypad_7 = null;
            Keypad_8 = null;
            Keypad_9 = null;
            Keypad_0 = null;
            Keypad_Star = null;
            Keypad_Pound = null;
            Keypad_Dial = null;
            Keypad_Backspace = null;
        }

        #endregion

    }
}
