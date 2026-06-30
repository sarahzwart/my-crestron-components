using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace contract_v1
{
    /// <summary>
    /// Common Interface for Root Contracts.
    /// </summary>
    public interface IContract
    {
        object UserObject { get; set; }
        void AddDevice(BasicTriListWithSmartObject device);
        void RemoveDevice(BasicTriListWithSmartObject device);
    }

    public class Contract : IContract, IDisposable
    {
        #region Components

        private ComponentMediator ComponentMediator { get; set; }

        public contract_v1.IAudio Audio { get { return (contract_v1.IAudio)InternalAudio; } }
        private contract_v1.Audio InternalAudio { get; set; }

        public contract_v1.IAppleTV AppleTV { get { return (contract_v1.IAppleTV)InternalAppleTV; } }
        private contract_v1.AppleTV InternalAppleTV { get; set; }

        public contract_v1.ICamera Camera { get { return (contract_v1.ICamera)InternalCamera; } }
        private contract_v1.Camera InternalCamera { get; set; }

        public contract_v1.IFont Font { get { return (contract_v1.IFont)InternalFont; } }
        private contract_v1.Font InternalFont { get; set; }

        public contract_v1.INavpage Navpage { get { return (contract_v1.INavpage)InternalNavpage; } }
        private contract_v1.Navpage InternalNavpage { get; set; }

        public contract_v1.IPhone Phone { get { return (contract_v1.IPhone)InternalPhone; } }
        private contract_v1.Phone InternalPhone { get; set; }

        public contract_v1.IRouting Routing { get { return (contract_v1.IRouting)InternalRouting; } }
        private contract_v1.Routing InternalRouting { get; set; }

        public contract_v1.ISystem System { get { return (contract_v1.ISystem)InternalSystem; } }
        private contract_v1.System InternalSystem { get; set; }

        public contract_v1.ISettings_Tab Settings_Tab { get { return (contract_v1.ISettings_Tab)InternalSettings_Tab; } }
        private contract_v1.Settings_Tab InternalSettings_Tab { get; set; }

        public contract_v1.ITheme Theme { get { return (contract_v1.ITheme)InternalTheme; } }
        private contract_v1.Theme InternalTheme { get; set; }

        #endregion

        #region Construction and Initialization

        public Contract()
            : this(new List<BasicTriListWithSmartObject>().ToArray())
        {
        }

        public Contract(BasicTriListWithSmartObject device)
            : this(new [] { device })
        {
        }

        public Contract(BasicTriListWithSmartObject[] devices)
        {
            if (devices == null)
                throw new ArgumentNullException("Devices is null");

            ComponentMediator = new ComponentMediator();

            InternalAudio = new contract_v1.Audio(ComponentMediator, 1);
            InternalAppleTV = new contract_v1.AppleTV(ComponentMediator, 2);
            InternalCamera = new contract_v1.Camera(ComponentMediator, 3);
            InternalFont = new contract_v1.Font(ComponentMediator, 4);
            InternalNavpage = new contract_v1.Navpage(ComponentMediator, 5);
            InternalPhone = new contract_v1.Phone(ComponentMediator, 6);
            InternalRouting = new contract_v1.Routing(ComponentMediator, 7);
            InternalSystem = new contract_v1.System(ComponentMediator, 8);
            InternalSettings_Tab = new contract_v1.Settings_Tab(ComponentMediator, 9);
            InternalTheme = new contract_v1.Theme(ComponentMediator, 10);

            for (int index = 0; index < devices.Length; index++)
            {
                AddDevice(devices[index]);
            }
        }

        #endregion

        #region Standard Contract Members

        public object UserObject { get; set; }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            InternalAudio.AddDevice(device);
            InternalAppleTV.AddDevice(device);
            InternalCamera.AddDevice(device);
            InternalFont.AddDevice(device);
            InternalNavpage.AddDevice(device);
            InternalPhone.AddDevice(device);
            InternalRouting.AddDevice(device);
            InternalSystem.AddDevice(device);
            InternalSettings_Tab.AddDevice(device);
            InternalTheme.AddDevice(device);
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            InternalAudio.RemoveDevice(device);
            InternalAppleTV.RemoveDevice(device);
            InternalCamera.RemoveDevice(device);
            InternalFont.RemoveDevice(device);
            InternalNavpage.RemoveDevice(device);
            InternalPhone.RemoveDevice(device);
            InternalRouting.RemoveDevice(device);
            InternalSystem.RemoveDevice(device);
            InternalSettings_Tab.RemoveDevice(device);
            InternalTheme.RemoveDevice(device);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            InternalAudio.Dispose();
            InternalAppleTV.Dispose();
            InternalCamera.Dispose();
            InternalFont.Dispose();
            InternalNavpage.Dispose();
            InternalPhone.Dispose();
            InternalRouting.Dispose();
            InternalSystem.Dispose();
            InternalSettings_Tab.Dispose();
            InternalTheme.Dispose();
            ComponentMediator.Dispose(); 
        }

        #endregion

    }
}
