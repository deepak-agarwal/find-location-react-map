import React, { Component } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Geocode from "react-geocode"

export class MapContainer extends Component {
	constructor(props) {
		super(props)
		// console.log(props)
		this.state = {
			currentLocation: {
				lat: 12.914885,
				lng: 77.601807
			},
			address:''
		}
	}

	componentDidMount() {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				const coords = pos.coords
				this.setState({
					currentLocation: {
						lat: coords.latitude,
						lng: coords.longitude
					}
				})
			})
		}
	}

	setCentre = (e, one) => {
		const { center } = one
		const lat = center.lat()
		const lng = center.lng()
		// console.log(lat, lng)
		const currentLocation = {
			lat,
			lng
		}
		this.setState({ currentLocation })
	}

	useStyle = {}

	// onMarkerDragEnd = (one, two, three) => {
	// 	const { latLng } = three
	// 	const lat = latLng.lat()
	// 	const lng = latLng.lng()
	// 	console.log(lat, lng)
	// }

	imageStyle = {
		top: "50%",
		left: "50%",
		zIndex: "1",
		height: "40px",
		width: "40px",
		position: "absolute"
	}

	mapStyle = {
		// zIndex: "-1"
	}

	imageWrapper = {
		height: "20px",
		width: "20px"
	}

	useStyle = {
		height: "100vh"
	}

	handleAddress= (address)=> {
		this.setState({address})
	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs={9} style={this.useStyle}>
						{/* <div style={this.imageWrapper}> */}
						<img src='/marker.png' alt='Marker' style={this.imageStyle} />
						{/* </div> */}
						<Map
							style={this.mapStyle}
							google={this.props.google}
							zoomControl={14}
							// centerAroundCurrentLocation={true}
							center={this.state.currentLocation}
							// scrollwheel={false}
							draggable={true}
							onDragend={this.setCentre}
						>
							{/* <Marker
					name={"Current location"}
					draggable={true}
					position={this.state.currentLocation}
					onDragend={this.onMarkerDragEnd}
				/> */}

							{/* <InfoWindow onClose={this.onInfoWindowClose} visible={true}>
					<div>
						<h1>{"Hello"}</h1>
					</div>
				</InfoWindow> */}
						</Map>
					</Col>
					<Col style={this.useStyle}>
						<AddressArea currentLocation={this.state.currentLocation} address={this.state.address} handleAddress={this.handleAddress}/>
					</Col>
				</Row>
			</Container>
		)
	}
}

export function AddressArea(props) {
	// console.log(props.currentLocation.lat)
	const { lat, lng } = props.currentLocation
	// console.log(lat, lng)
	const headerAlign = {
		top: "100px",
		left: "50px",
		position: "absolute"
	}

	
	Geocode.setApiKey(process.env.REACT_APP_MAPS_API)

	
	// Geocode.enableDebug()


	Geocode.fromLatLng(lat,lng).then(
		response => {
		   const address = response.results[0].formatted_address
			props.handleAddress(address)
			// console.log(props.address)
		},
		error => {
			console.error(error)
		}
	)
	return <p style={headerAlign}>{props.address}</p>
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_MAPS_API
})(MapContainer)
