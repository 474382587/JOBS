
import React from "react"
import { Button } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Invictus Questionare</h2>
                <Button>Button</Button>
            </div>
        )
    }
}

export default App


<script>
   if (typeof(stockdio_events) == "undefined") {
      stockdio_events = true;
      var stockdio_eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      var stockdio_eventer = window[stockdio_eventMethod];
      var stockdio_messageEvent = stockdio_eventMethod == "attachEvent" ? "onmessage" : "message";
      stockdio_eventer(stockdio_messageEvent, function (e) {
         if (typeof(e.data) != "undefined" && typeof(e.data.method) != "undefined") {
            eval(e.data.method);
         }
      },false);
   }
</script>
<iframe id='st_87db05c95c50468ca38a51370cf1d612' frameBorder='0' scrolling='no' width='100%' height='100%' src='https://api.stockdio.com/visualization/financial/charts/v1/Ticker?app-key=896EDD90C19E4295B1C85CC8D2179D10&stockExchange=CSE&symbols=CSI;OTCMKTS%3ACADMF&palette=Financial-Light&layoutType=3&onload=st_87db05c95c50468ca38a51370cf1d612'></iframe>