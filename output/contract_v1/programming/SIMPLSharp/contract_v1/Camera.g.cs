using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace contract_v1
{
    public interface ICamera
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Zoom_In_Press;
        event EventHandler<UIEventArgs> Zoom_Out_Press;
        event EventHandler<UIEventArgs> Pan_Up_Press;
        event EventHandler<UIEventArgs> Pan_Down_Press;
        event EventHandler<UIEventArgs> Pan_Left_Press;
        event EventHandler<UIEventArgs> Pan_Right_Press;
        event EventHandler<UIEventArgs> Home_Press;
        event EventHandler<UIEventArgs> Preset_1;
        event EventHandler<UIEventArgs> Preset_2;
        event EventHandler<UIEventArgs> Preset_3;
        event EventHandler<UIEventArgs> AutoFocus;
        event EventHandler<UIEventArgs> Preset_4;
        event EventHandler<UIEventArgs> Preset_5;
        event EventHandler<UIEventArgs> Selected;

        void Preset_1_FB(CameraBoolInputSigDelegate callback);
        void Preset_2_FB(CameraBoolInputSigDelegate callback);
        void Preset_3_FB(CameraBoolInputSigDelegate callback);
        void Preset_4_FB(CameraBoolInputSigDelegate callback);
        void Preset_5_FB(CameraBoolInputSigDelegate callback);
        void AutoFocus_FB(CameraBoolInputSigDelegate callback);
        void Selected_FB(CameraUShortInputSigDelegate callback);

    }

    public delegate void CameraBoolInputSigDelegate(BoolInputSig boolInputSig, ICamera camera);
    public delegate void CameraUShortInputSigDelegate(UShortInputSig uShortInputSig, ICamera camera);

    internal class Camera : ICamera, IDisposable
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
                public const uint Zoom_In_Press = 1;
                public const uint Zoom_Out_Press = 2;
                public const uint Pan_Up_Press = 3;
                public const uint Pan_Down_Press = 4;
                public const uint Pan_Left_Press = 5;
                public const uint Pan_Right_Press = 6;
                public const uint Home_Press = 7;
                public const uint Preset_1 = 8;
                public const uint Preset_2 = 9;
                public const uint Preset_3 = 10;
                public const uint AutoFocus = 11;
                public const uint Preset_4 = 12;
                public const uint Preset_5 = 13;

                public const uint Preset_1_FB = 8;
                public const uint Preset_2_FB = 9;
                public const uint Preset_3_FB = 10;
                public const uint Preset_4_FB = 11;
                public const uint Preset_5_FB = 12;
                public const uint AutoFocus_FB = 13;
            }
            internal static class Numerics
            {
                public const uint Selected = 1;

                public const uint Selected_FB = 1;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Camera(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Zoom_In_Press, onZoom_In_Press);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Zoom_Out_Press, onZoom_Out_Press);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Pan_Up_Press, onPan_Up_Press);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Pan_Down_Press, onPan_Down_Press);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Pan_Left_Press, onPan_Left_Press);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Pan_Right_Press, onPan_Right_Press);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Home_Press, onHome_Press);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Preset_1, onPreset_1);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Preset_2, onPreset_2);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Preset_3, onPreset_3);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.AutoFocus, onAutoFocus);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Preset_4, onPreset_4);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Preset_5, onPreset_5);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Selected, onSelected);

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

        public event EventHandler<UIEventArgs> Zoom_In_Press;
        private void onZoom_In_Press(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Zoom_In_Press;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Zoom_Out_Press;
        private void onZoom_Out_Press(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Zoom_Out_Press;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Pan_Up_Press;
        private void onPan_Up_Press(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Pan_Up_Press;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Pan_Down_Press;
        private void onPan_Down_Press(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Pan_Down_Press;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Pan_Left_Press;
        private void onPan_Left_Press(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Pan_Left_Press;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Pan_Right_Press;
        private void onPan_Right_Press(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Pan_Right_Press;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Home_Press;
        private void onHome_Press(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Home_Press;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Preset_1;
        private void onPreset_1(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Preset_1;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Preset_2;
        private void onPreset_2(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Preset_2;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Preset_3;
        private void onPreset_3(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Preset_3;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> AutoFocus;
        private void onAutoFocus(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = AutoFocus;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Preset_4;
        private void onPreset_4(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Preset_4;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Preset_5;
        private void onPreset_5(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Preset_5;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Preset_1_FB(CameraBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Preset_1_FB], this);
            }
        }

        public void Preset_2_FB(CameraBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Preset_2_FB], this);
            }
        }

        public void Preset_3_FB(CameraBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Preset_3_FB], this);
            }
        }

        public void Preset_4_FB(CameraBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Preset_4_FB], this);
            }
        }

        public void Preset_5_FB(CameraBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Preset_5_FB], this);
            }
        }

        public void AutoFocus_FB(CameraBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.AutoFocus_FB], this);
            }
        }

        public event EventHandler<UIEventArgs> Selected;
        private void onSelected(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Selected;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Selected_FB(CameraUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Selected_FB], this);
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
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Camera", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Zoom_In_Press = null;
            Zoom_Out_Press = null;
            Pan_Up_Press = null;
            Pan_Down_Press = null;
            Pan_Left_Press = null;
            Pan_Right_Press = null;
            Home_Press = null;
            Preset_1 = null;
            Preset_2 = null;
            Preset_3 = null;
            AutoFocus = null;
            Preset_4 = null;
            Preset_5 = null;
            Selected = null;
        }

        #endregion

    }
}
