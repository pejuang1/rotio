import React, { Component } from 'react';
import {View,StatusBar, Image, FlatList, ImageBackground} from 'react-native'
import { Text, Input, Button, Header } from 'react-native-elements';
// import Icon from 'react-native-vector-icons'
import Headercolor from '../img/headerku4.jpg'
// import {IconButton} from 'react-native-paper'
import Axios from 'axios'
// import Splashscreen from './splashscreen'
// import * as Animatable from 'react-native-animatable'


// const API = 'http://sci.rotio.id:5558/webserv/webapi/';

class Halamanutama extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      product: [],
      quantity:[],
      valueartikel:'',
      valueproduct:null,
      artikel:[],
      query:'',
      selectedOutlet:null,
      selectedProduct: null
     }
    }

     componentDidMount() {
        // ======================API_product================
    fetch(`http://sci.rotio.id:5558/webserv/webapi/products/`, )
      .then(res => res.json())
      .then(json => {
        const { data: product } = json;
        this.setState({ product })
        // console.log(product[0])
      });

      // =====================API_artikel===================
      Axios.get(`http://sci.rotio.id:5558/webserv/webapi/warehouses/`)
        .then((res)=>{
           this.setState({artikel:res.data})
        })
  }


      // ============================function loading button============================
      // loadingbutton=()=>{
      //   if(this.checkquantity){
      //     this.setState({loading:false})
      //   }else{
      //     this.setState({loading:false})
      //   }
      // }

      // ========================function menampilkan quantity=========================
  checkquantity = () =>{
    // console.log(this.state.selectedOutlet)
    // if(this.state.selectedOutlet&&this.state.selectedProduct !== null){
             Axios.get(`http://sci.rotio.id:5558/webserv/webapi/storage/${this.state.selectedOutlet}/${this.state.selectedProduct}`)
             .then((res)=>{
               this.setState({quantity:res.data})
              //  console.log(res.data.result)
              }).then(()=>{
                return this.state.quantity.result.map((val)=>{
                  // this.state.artikel.map(val1)
                  alert('Lokasi: '+val.loc_name+'\n'+'Nama: '+val.name+'\n' + 'Stok tersedia: '+val.qty)
                })
              })
    // }else{
    //   alert('Tolong isi semua data')
    // }
  }

          // ========================function menampilkan quantity=========================
   
  // showquantity = ()=>{
  //   Axios.get(`${API}warehouses/`)
  //       .then((res)=>{
  //          this.setState({artikel:res.data})
  //       }).then(()=>{
  //         return this.state.artikel.map((val)=>{
  //           alert(val.name)
  //         })
  //       })
  //   }

      // ========================function mencari artikel=========================

  findartikel(query){
    if (query === ''){
      return []
    }
    // const {artikel} = this.state
    const regex = new RegExp(`${query.trim()}`, 'i')

    return this.state.artikel.filter(val => val.value.search(regex) >= 0 )
    
  }

      // ========================function mencari product=========================
  findproduct(query) {
    if (query === '') {
      return []
    } 
    // const { product } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return this.state.product.filter(film => film.value.search(regex) >= 0);
  }

    render() {           
          
        return ( 
          <View>
                {/* <ImageBackground source={require('../img/headerku4.jpg')} style={{width:"100%", height:"100%"}}> */}
                <Header
                backgroundImageStyle={{height:220}}
                backgroundImage={Headercolor}
                // placement='left'
                // leftComponent={<Image source={require('../img/logoheader.png')}/>}
                centerComponent={<Image source={require('../img/logoawal.png')} style={{height:100, width:100, marginTop:100}}/>}
                />
                <View style={{marginTop:110, marginLeft:20, alignItems:"center", marginRight:20}}>
                <Button
                buttonStyle={{width:250, alignItems:"center", borderColor:'white' ,justifyContent:"center", borderRadius:25, backgroundColor:'white'}}
                title='Quantity Check'
                type='outline'
                raised={true}
                />
                <View style={{marginTop:100}}>
                  </View>
                <Input
                    label='Outlet'
                    onChangeText={(text)=>this.setState({selectedOutlet:text})}
                    placeholder='Input kode'
                    ></Input>
                <View style={{marginTop:40}}/>
                <Input
                    // value={}
                    onChangeText={text => this.setState({ selectedProduct:text })}
                    label='Products'
                    placeholder='Input kode'
                    />
                <View style={{marginTop:80}}/>
                {/* <AutoSuggest terms={suggestions}/> */}
                <Button
                title='Check'
                buttonStyle={{backgroundColor:'orange', width:120, borderRadius:25}}
                onPress={this.checkquantity}
                // loading={this.loadingbutton}
                />
                {/* <View style={{marginTop:40}}>
                  <Text>
                    {this.showquantity}
                  </Text>
                </View> */}

                </View>
                     {/* </ImageBackground> */}
               
            </View>
         );
    }
}
 
export default Halamanutama;