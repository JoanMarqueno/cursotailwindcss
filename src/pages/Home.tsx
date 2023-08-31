
import { MainInfo } from '../components/mainInfo'
import requests from '../Requests'
import RowRequests from '../components/row'

export const Home = () => {
  return (
    <div>
        <MainInfo />
        <RowRequests rowId='1' title='Up Coming' fetchURL={requests.requestUpcoming} />
        <RowRequests rowId='2' title='Popular' fetchURL={requests.requestPopular} />
        <RowRequests rowId='3' title='Trending' fetchURL={requests.requestTrending} />
        <RowRequests rowId='4' title='Top Rated' fetchURL={requests.requestTopRated} />
        <RowRequests rowId='5' title='Horror' fetchURL={requests.requestHorror} />
    </div>
  )
}
