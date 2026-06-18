using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace contract_v1
{
    public interface IRouting
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Source_1;
        event EventHandler<UIEventArgs> Source_2;
        event EventHandler<UIEventArgs> Source_3;
        event EventHandler<UIEventArgs> Source_4;
        event EventHandler<UIEventArgs> Source_5;
        event EventHandler<UIEventArgs> Source_6;
        event EventHandler<UIEventArgs> Source_7;
        event EventHandler<UIEventArgs> Dest_1;
        event EventHandler<UIEventArgs> Dest_2;
        event EventHandler<UIEventArgs> Dest_3;
        event EventHandler<UIEventArgs> Dest_4;
        event EventHandler<UIEventArgs> Dest_5;
        event EventHandler<UIEventArgs> Dest_6;
        event EventHandler<UIEventArgs> Route;

        void Source_1_FB(RoutingBoolInputSigDelegate callback);
        void Source_2_FB(RoutingBoolInputSigDelegate callback);
        void Source_3_FB(RoutingBoolInputSigDelegate callback);
        void Source_4_FB(RoutingBoolInputSigDelegate callback);
        void Source_5_FB(RoutingBoolInputSigDelegate callback);
        void Source_6_FB(RoutingBoolInputSigDelegate callback);
        void Source_7_FB(RoutingBoolInputSigDelegate callback);
        void Dest_1_FB(RoutingBoolInputSigDelegate callback);
        void Dest_2_FB(RoutingBoolInputSigDelegate callback);
        void Dest_3_FB(RoutingBoolInputSigDelegate callback);
        void Dest_4_FB(RoutingBoolInputSigDelegate callback);
        void Dest_5_FB(RoutingBoolInputSigDelegate callback);
        void Dest_6_FB(RoutingBoolInputSigDelegate callback);
        void Route_FB(RoutingBoolInputSigDelegate callback);

    }

    public delegate void RoutingBoolInputSigDelegate(BoolInputSig boolInputSig, IRouting routing);

    internal class Routing : IRouting, IDisposable
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
                public const uint Source_1 = 1;
                public const uint Source_2 = 2;
                public const uint Source_3 = 3;
                public const uint Source_4 = 4;
                public const uint Source_5 = 5;
                public const uint Source_6 = 6;
                public const uint Source_7 = 7;
                public const uint Dest_1 = 8;
                public const uint Dest_2 = 9;
                public const uint Dest_3 = 10;
                public const uint Dest_4 = 11;
                public const uint Dest_5 = 12;
                public const uint Dest_6 = 13;
                public const uint Route = 14;

                public const uint Source_1_FB = 1;
                public const uint Source_2_FB = 2;
                public const uint Source_3_FB = 3;
                public const uint Source_4_FB = 4;
                public const uint Source_5_FB = 5;
                public const uint Source_6_FB = 6;
                public const uint Source_7_FB = 7;
                public const uint Dest_1_FB = 8;
                public const uint Dest_2_FB = 9;
                public const uint Dest_3_FB = 10;
                public const uint Dest_4_FB = 11;
                public const uint Dest_5_FB = 12;
                public const uint Dest_6_FB = 13;
                public const uint Route_FB = 14;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Routing(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Source_1, onSource_1);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Source_2, onSource_2);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Source_3, onSource_3);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Source_4, onSource_4);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Source_5, onSource_5);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Source_6, onSource_6);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Source_7, onSource_7);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Dest_1, onDest_1);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Dest_2, onDest_2);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Dest_3, onDest_3);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Dest_4, onDest_4);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Dest_5, onDest_5);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Dest_6, onDest_6);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Route, onRoute);

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

        public event EventHandler<UIEventArgs> Source_1;
        private void onSource_1(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Source_1;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Source_2;
        private void onSource_2(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Source_2;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Source_3;
        private void onSource_3(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Source_3;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Source_4;
        private void onSource_4(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Source_4;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Source_5;
        private void onSource_5(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Source_5;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Source_6;
        private void onSource_6(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Source_6;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Source_7;
        private void onSource_7(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Source_7;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Dest_1;
        private void onDest_1(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Dest_1;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Dest_2;
        private void onDest_2(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Dest_2;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Dest_3;
        private void onDest_3(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Dest_3;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Dest_4;
        private void onDest_4(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Dest_4;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Dest_5;
        private void onDest_5(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Dest_5;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Dest_6;
        private void onDest_6(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Dest_6;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Route;
        private void onRoute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Route;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Source_1_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Source_1_FB], this);
            }
        }

        public void Source_2_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Source_2_FB], this);
            }
        }

        public void Source_3_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Source_3_FB], this);
            }
        }

        public void Source_4_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Source_4_FB], this);
            }
        }

        public void Source_5_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Source_5_FB], this);
            }
        }

        public void Source_6_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Source_6_FB], this);
            }
        }

        public void Source_7_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Source_7_FB], this);
            }
        }

        public void Dest_1_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Dest_1_FB], this);
            }
        }

        public void Dest_2_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Dest_2_FB], this);
            }
        }

        public void Dest_3_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Dest_3_FB], this);
            }
        }

        public void Dest_4_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Dest_4_FB], this);
            }
        }

        public void Dest_5_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Dest_5_FB], this);
            }
        }

        public void Dest_6_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Dest_6_FB], this);
            }
        }

        public void Route_FB(RoutingBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Route_FB], this);
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
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Routing", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Source_1 = null;
            Source_2 = null;
            Source_3 = null;
            Source_4 = null;
            Source_5 = null;
            Source_6 = null;
            Source_7 = null;
            Dest_1 = null;
            Dest_2 = null;
            Dest_3 = null;
            Dest_4 = null;
            Dest_5 = null;
            Dest_6 = null;
            Route = null;
        }

        #endregion

    }
}
