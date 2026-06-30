using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace contract_v1
{
    public interface IAppleTV
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> Up;
        event EventHandler<UIEventArgs> Down;
        event EventHandler<UIEventArgs> Left;
        event EventHandler<UIEventArgs> Right;
        event EventHandler<UIEventArgs> Enter;
        event EventHandler<UIEventArgs> Menu;
        event EventHandler<UIEventArgs> Home;
        event EventHandler<UIEventArgs> Back;
        event EventHandler<UIEventArgs> PlayPause;


    }

    public delegate void AppleTVBoolInputSigDelegate(BoolInputSig boolInputSig, IAppleTV appleTV);

    internal class AppleTV : IAppleTV, IDisposable
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
                public const uint Up = 1;
                public const uint Down = 2;
                public const uint Left = 3;
                public const uint Right = 4;
                public const uint Enter = 5;
                public const uint Menu = 6;
                public const uint Home = 7;
                public const uint Back = 8;
                public const uint PlayPause = 9;

            }
        }

        #endregion

        #region Construction and Initialization

        internal AppleTV(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Up, onUp);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Down, onDown);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Left, onLeft);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Right, onRight);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Enter, onEnter);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Menu, onMenu);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Home, onHome);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.Back, onBack);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.PlayPause, onPlayPause);

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

        public event EventHandler<UIEventArgs> Up;
        private void onUp(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Up;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Down;
        private void onDown(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Down;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Left;
        private void onLeft(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Left;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Right;
        private void onRight(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Right;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Enter;
        private void onEnter(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Enter;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Menu;
        private void onMenu(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Menu;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Home;
        private void onHome(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Home;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> Back;
        private void onBack(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = Back;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> PlayPause;
        private void onPlayPause(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = PlayPause;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        #endregion

        #region Overrides

        public override int GetHashCode()
        {
            return (int)ControlJoinId;
        }

        public override string ToString()
        {
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "AppleTV", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            Up = null;
            Down = null;
            Left = null;
            Right = null;
            Enter = null;
            Menu = null;
            Home = null;
            Back = null;
            PlayPause = null;
        }

        #endregion

    }
}
