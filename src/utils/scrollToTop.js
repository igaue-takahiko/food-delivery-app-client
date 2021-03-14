import { useEffect } from 'react'
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({ history }) => {
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    })
    return () => {
      unListen()
    }
  },[history])

  return null
}

export default withRouter(ScrollToTop)
