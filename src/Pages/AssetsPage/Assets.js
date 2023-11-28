import { useParams } from 'react-router-dom';
import React from 'react';
import Modal from '../../Utils/Modal';
import AssetRegForm from '../../Components/Forms/AssetRegForm';
import AssetCard from '../../Components/AssetsPage/AssetCard';
import Loading from '../../Utils/Loading';
import API_URL from '../../config';

function Assets() {
  const { workshopCode } = useParams();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getAssets = async () => {
    const response = await fetch(`${API_URL}/data/asset/asset-list?workshop=${workshopCode}`);
    if (response.ok) {
      const data = await response.json();
      setData(data.data);
      setLoading(false);
      // console.log(data.data);
    } else {
      setTimeout(getAssets, 5000);
    }
  };

  React.useEffect(() => {
    getAssets();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center'>
          <Loading />
          <div className='text-gray-900 font-bold text-xl mt-4'>Loading...</div>
        </div>
      </div>
    );
  }

  if (!loading && !data.length) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center'>
          <Modal>
            <AssetRegForm />
          </Modal>
          <div className='text-gray-900 font-bold text-xl mt-4'>Add New Asset</div>
        </div>
      </div>
    );
  }

  return (
    <div className='px-4 lg:px-10 pt-3'>
      <div className='flex justify-between items-center mb-3'>
        <div>
          <p className='text-gray-800 text-2xl font-bold'>Assets</p>
          <p className='text-gray-600 text-base font-semibold'>{window.location.pathname}</p>
        </div>
        <Modal>
          <AssetRegForm />
        </Modal>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 sm:gap-3 2xl:gap-1'>
        {data.map((item) => (
          <div key={item.asset_id}>
            <AssetCard
              assetID={item.asset_id}
              sensorsConnected={item.sensors_connected}
              sensorIDs={item.sensors_connected.map((sensor) => sensor.sensor_id)}
              assetType={item.asset_type}
              site={item.site}
              workshop={item.workshop_id_fk}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assets;
