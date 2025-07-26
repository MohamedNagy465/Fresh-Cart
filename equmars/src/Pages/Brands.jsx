import Card from '../Compenent/Card'
import axios from 'axios'
import Loading from '../Compenent/Loading'
import { useQuery } from '@tanstack/react-query'

export default function Brands() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: () => {
      return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    },
  })

  return (
    <div className="pt-[80px] min-h-[calc(100vh-80px)] bg-white">
      {isLoading ? (
        <div className="text-center text-green-500 text-lg font-medium py-10">
          <Loading />
        </div>
      ) : isError ? (
        <h3 className="text-2xl text-red-600 text-center py-10">
          ❌ حدث خطأ أثناء تحميل البراندات
        </h3>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 py-5">
          {data.data.data.map((item) => (
            <Card key={item._id} item={item} type="brand" />
          ))}
        </div>
      )}
    </div>
  )
}
