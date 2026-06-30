using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace contract_v1
{
    public interface IAudio
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Footer_Mute;
        event EventHandler<UIEventArgs> Master_Mute;
        event EventHandler<UIEventArgs> Volume_1_Mute;
        event EventHandler<UIEventArgs> Volume_2_Mute;
        event EventHandler<UIEventArgs> Volume_3_Mute;
        event EventHandler<UIEventArgs> Volume_4_Mute;
        event EventHandler<UIEventArgs> Volume_5_Mute;
        event EventHandler<UIEventArgs> Volume_6_Mute;
        event EventHandler<UIEventArgs> Footer_Volume;
        event EventHandler<UIEventArgs> Volume_2;
        event EventHandler<UIEventArgs> Master_Volume;
        event EventHandler<UIEventArgs> Volume_1;
        event EventHandler<UIEventArgs> Volume_3;
        event EventHandler<UIEventArgs> Volume_4;
        event EventHandler<UIEventArgs> Volume_5;
        event EventHandler<UIEventArgs> Volume_6;

        void Footer_Mute_FB(AudioBoolInputSigDelegate callback);
        void Master_Mute_FB(AudioBoolInputSigDelegate callback);
        void Volume_1_Mute_FB(AudioBoolInputSigDelegate callback);
        void Volume_2_Mute_FB(AudioBoolInputSigDelegate callback);
        void Volume_3_Mute_FB(AudioBoolInputSigDelegate callback);
        void Volume_4_Mute_FB(AudioBoolInputSigDelegate callback);
        void Volume_5_Mute_FB(AudioBoolInputSigDelegate callback);
        void Volume_6_Mute_FB(AudioBoolInputSigDelegate callback);
        void Footer_Volume_FB(AudioUShortInputSigDelegate callback);
        void Master_Volume_FB(AudioUShortInputSigDelegate callback);
        void Volume_1_FB(AudioUShortInputSigDelegate callback);
        void Volume_2_FB(AudioUShortInputSigDelegate callback);
        void Volume_3_FB(AudioUShortInputSigDelegate callback);
        void Volume_4_FB(AudioUShortInputSigDelegate callback);
        void Volume_5_FB(AudioUShortInputSigDelegate callback);
        void Volume_6_FB(AudioUShortInputSigDelegate callback);

    }

    public delegate void AudioBoolInputSigDelegate(BoolInputSig boolInputSig, IAudio audio);
    public delegate void AudioUShortInputSigDelegate(UShortInputSig uShortInputSig, IAudio audio);

    /// <summary>
    /// Audio Control
    /// </summary>
    internal class Audio : IAudio, IDisposable
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
                public const uint Footer_Mute = 1;
                public const uint Master_Mute = 2;
                public const uint Volume_1_Mute = 3;
                public const uint Volume_2_Mute = 4;
                public const uint Volume_3_Mute = 5;
                public const uint Volume_4_Mute = 6;
                public const uint Volume_5_Mute = 7;
                public const uint Volume_6_Mute = 8;

                public const uint Footer_Mute_FB = 1;
                public const uint Master_Mute_FB = 2;
                public const uint Volume_1_Mute_FB = 3;
                public const uint Volume_2_Mute_FB = 4;
                public const uint Volume_3_Mute_FB = 5;
                public const uint Volume_4_Mute_FB = 6;
                public const uint Volume_5_Mute_FB = 7;
                public const uint Volume_6_Mute_FB = 8;
            }
            internal static class Numerics
            {
                public const uint Footer_Volume = 1;
                public const uint Volume_2 = 2;
                public const uint Master_Volume = 3;
                public const uint Volume_1 = 4;
                public const uint Volume_3 = 5;
                public const uint Volume_4 = 6;
                public const uint Volume_5 = 7;
                public const uint Volume_6 = 8;

                public const uint Footer_Volume_FB = 1;
                public const uint Master_Volume_FB = 2;
                public const uint Volume_1_FB = 3;
                public const uint Volume_2_FB = 4;
                public const uint Volume_3_FB = 5;
                public const uint Volume_4_FB = 6;
                public const uint Volume_5_FB = 7;
                public const uint Volume_6_FB = 8;
            }
        }

        #endregion

        #region Construction and Initialization

        internal Audio(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Footer_Mute, onFooter_Mute);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Master_Mute, onMaster_Mute);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Volume_1_Mute, onVolume_1_Mute);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Volume_2_Mute, onVolume_2_Mute);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Volume_3_Mute, onVolume_3_Mute);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Volume_4_Mute, onVolume_4_Mute);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Volume_5_Mute, onVolume_5_Mute);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Volume_6_Mute, onVolume_6_Mute);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Footer_Volume, onFooter_Volume);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Volume_2, onVolume_2);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Master_Volume, onMaster_Volume);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Volume_1, onVolume_1);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Volume_3, onVolume_3);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Volume_4, onVolume_4);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Volume_5, onVolume_5);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.Volume_6, onVolume_6);

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

        public event EventHandler<UIEventArgs> Footer_Mute;
        private void onFooter_Mute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Footer_Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Master_Mute;
        private void onMaster_Mute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Master_Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_1_Mute;
        private void onVolume_1_Mute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_1_Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_2_Mute;
        private void onVolume_2_Mute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_2_Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_3_Mute;
        private void onVolume_3_Mute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_3_Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_4_Mute;
        private void onVolume_4_Mute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_4_Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_5_Mute;
        private void onVolume_5_Mute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_5_Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_6_Mute;
        private void onVolume_6_Mute(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_6_Mute;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Footer_Mute_FB(AudioBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Footer_Mute_FB], this);
            }
        }

        public void Master_Mute_FB(AudioBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Master_Mute_FB], this);
            }
        }

        public void Volume_1_Mute_FB(AudioBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Volume_1_Mute_FB], this);
            }
        }

        public void Volume_2_Mute_FB(AudioBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Volume_2_Mute_FB], this);
            }
        }

        public void Volume_3_Mute_FB(AudioBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Volume_3_Mute_FB], this);
            }
        }

        public void Volume_4_Mute_FB(AudioBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Volume_4_Mute_FB], this);
            }
        }

        public void Volume_5_Mute_FB(AudioBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Volume_5_Mute_FB], this);
            }
        }

        public void Volume_6_Mute_FB(AudioBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.Volume_6_Mute_FB], this);
            }
        }

        public event EventHandler<UIEventArgs> Footer_Volume;
        private void onFooter_Volume(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Footer_Volume;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_2;
        private void onVolume_2(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_2;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Master_Volume;
        private void onMaster_Volume(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Master_Volume;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_1;
        private void onVolume_1(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_1;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_3;
        private void onVolume_3(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_3;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_4;
        private void onVolume_4(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_4;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_5;
        private void onVolume_5(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_5;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Volume_6;
        private void onVolume_6(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Volume_6;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void Footer_Volume_FB(AudioUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Footer_Volume_FB], this);
            }
        }

        public void Master_Volume_FB(AudioUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Master_Volume_FB], this);
            }
        }

        public void Volume_1_FB(AudioUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Volume_1_FB], this);
            }
        }

        public void Volume_2_FB(AudioUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Volume_2_FB], this);
            }
        }

        public void Volume_3_FB(AudioUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Volume_3_FB], this);
            }
        }

        public void Volume_4_FB(AudioUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Volume_4_FB], this);
            }
        }

        public void Volume_5_FB(AudioUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Volume_5_FB], this);
            }
        }

        public void Volume_6_FB(AudioUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.Volume_6_FB], this);
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
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "Audio", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Footer_Mute = null;
            Master_Mute = null;
            Volume_1_Mute = null;
            Volume_2_Mute = null;
            Volume_3_Mute = null;
            Volume_4_Mute = null;
            Volume_5_Mute = null;
            Volume_6_Mute = null;
            Footer_Volume = null;
            Volume_2 = null;
            Master_Volume = null;
            Volume_1 = null;
            Volume_3 = null;
            Volume_4 = null;
            Volume_5 = null;
            Volume_6 = null;
        }

        #endregion

    }
}
