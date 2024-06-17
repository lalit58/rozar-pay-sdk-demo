import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RazorpayCheckout from 'react-native-razorpay';

const imgURL =
  'https://m.media-amazon.com/images/I/61L5QgPvgqL._AC_UF1000,1000_QL80_.jpg';

const App = () => {
  const onPressBuy = () => {
    //Order Api: Call POST api with body like (username, id, price etc) to create an Order and use order_id in below options object
    // const response = await .....

    let options = {
      description: 'Credits towards consultation',
      image: imgURL, //require('../../images.png')
      currency: 'INR', //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
      key: "rzp_test_iEeFYSOWPaHGKZ",
      amount: "5000",
      name: 'Macbook Air',
      order_id: '', //Replace this with an order_id(response.data.orderId) created using Orders API.
      prefill: {
        email: 'hasan@example.com',
        contact: '7978850565',
        name: 'Lalit',
      }, //if prefill is not provided then on razorpay screen it has to be manually entered.
      theme: {color: '#FFFF00'},
      notes: {
        GST: '12.5%', // Add GST as a note
        commission: '5%', // Add commission as a note
      },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imgURL,
        }}
        style={{width: 200, height: 100}}
        resizeMode="contain"
      />
      <Text>PRICE: 125000/-</Text>
      <Button title="Buy" color={'darkblue'} onPress={onPressBuy} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});