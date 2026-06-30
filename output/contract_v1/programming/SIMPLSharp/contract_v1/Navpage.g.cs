using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace contract_v1
{
    public interface INavpage
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Home_Press;
        event EventHandler<UIEventArgs> Audio;
        event EventHandler<UIEventArgs> Call;
        event EventHandler<UIEventArgs> Routing;
        event EventHandler<UIEventArgs> Lights;
        event EventHandler<UIEventArgs> Camera;
        event EventHandler<UIEventArgs> AppleTV;
        event EventHandler<UIEventArgs> Overview;
        event EventHandler<UIEventArgs> Settings;

        void Home_FB(NavpageBoolInputSigDelegate callback);
        void Audio_FB(NavpageBoolInputSigDelegate callback);
        void Call_FB(NavpageBoolInputSigDelegate callback);
        void Routing_FB(NavpageBoolInputSigDelegate callback);
        void Lights_FB(NavpageBoolInputSigDelegate callback);
        void Camera_FB(NavpageBoolInputSigDelegate callback);
        void AppleTV_FB(NavpageBoolInputSigDelegate callback);
        void Overview_FB(NavpageBoolInputSigDelegate callback);
        void Settings_FB(NavpageBoolInputSigDelegate callback);

    }

    public delegate void NavpageBoolInputSigDelegate(BoolInputSig boolInputSig, INavpage navpage);

    internal class Navpage : INavpage, IDisposable
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
                public const uint Home_Press = 1;
                public const uint Audio = 2;
                public const uint Call = 3;
                public const uint Routing = 4;
                public const uint Lights = 5;
                public const uint Camera = 6;
                public const uint AppleTV = 7;
                public const uint Overview = 8;
                public const uint Settings = 9;

                public const uint Home_FB = 1;
                public const uint Audio_FB = 2;
                public const uint Call_FB = 3;
                public const uint Routing_FB = 4;
                public const uint Lights_FB = 5;
                public const uint Camera_FB = 6;
                public const uint AppleTV_FB = 7;
                public const uint Overview_FB = 8;
                public const uint Settings_FB = 9;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Navpage(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Home_Press, onHome_Press);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Audio, onAudio);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Call, onCall);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Routing, onRouting);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Lights, onLights);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Camera, onCamera);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.AppleTV, onAppleTV);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Overview, onOverview);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Settings, onSettings);

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

        public event EventHandler<UIEventArgs> Home_Press;
        private void onHome_Press(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Home_Press;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Audio;
        private void onAudio(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Audio;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Call;
        private void onCall(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Call;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Routing;
        private void onRouting(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Routing;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Lights;
        private void onLights(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Lights;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Camera;
        private void onCamera(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Camera;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> AppleTV;
        private void onAppleTV(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = AppleTV;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Overview;
        private void onOverview(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Overview;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Settings;
        private void onSettings(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Settings;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Home_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Home_FB], this);
            }
        }

        public void Audio_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Audio_FB], this);
            }
        }

        public void Call_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Call_FB], this);
            }
        }

        public void Routing_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Routing_FB], this);
            }
        }

        public void Lights_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Lights_FB], this);
            }
        }

        public void Camera_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Camera_FB], this);
            }
        }

        public void AppleTV_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.AppleTV_FB], this);
            }
        }

        public void Overview_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Overview_FB], this);
            }
        }

        public void Settings_FB(NavpageBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Settings_FB], this);
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
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Navpage", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Home_Press = null;
            Audio = null;
            Call = null;
            Routing = null;
            Lights = null;
            Camera = null;
            AppleTV = null;
            Overview = null;
            Settings = null;
        }

        #endregion

    }
}
