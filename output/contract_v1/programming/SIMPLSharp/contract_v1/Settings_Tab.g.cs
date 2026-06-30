using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace contract_v1
{
    public interface ISettings_Tab
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Theme;
        event EventHandler<UIEventArgs> Font;

        void Theme_FB(Settings_TabBoolInputSigDelegate callback);
        void Font_FB(Settings_TabBoolInputSigDelegate callback);

    }

    public delegate void Settings_TabBoolInputSigDelegate(BoolInputSig boolInputSig, ISettings_Tab settings_Tab);

    internal class Settings_Tab : ISettings_Tab, IDisposable
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
                public const uint Theme = 1;
                public const uint Font = 2;

                public const uint Theme_FB = 1;
                public const uint Font_FB = 2;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Settings_Tab(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Theme, onTheme);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Font, onFont);

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

        public event EventHandler<UIEventArgs> Theme;
        private void onTheme(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Theme;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Font;
        private void onFont(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Font;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Theme_FB(Settings_TabBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Theme_FB], this);
            }
        }

        public void Font_FB(Settings_TabBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Font_FB], this);
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
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Settings_Tab", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Theme = null;
            Font = null;
        }

        #endregion

    }
}
