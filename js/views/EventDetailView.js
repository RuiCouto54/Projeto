import EventController from '../controllers/EventController.js'
import UserController from '../controllers/UserController.js'


export default class EventDetailView {
    constructor() {
        this.eventController = new EventController()
        this.userController = new UserController()

        //DOM
        this.eventName = document.querySelector("#txtEventName")
        this.eventLocation = document.querySelector("#txtLocation")
        this.imgEvent = document.querySelector("#imgEvent")
        this.txtDate = document.querySelector("#txtDate")
        this.txtPrice = document.querySelector("#txtPrice")
        this.txtRetrieve = document.querySelector("#txtRetrieve")
        this.txtDesc = document.querySelector("#txtDesc")
        this.txtRecord = document.querySelector("#txtRecord")
        this.txtTimeLimit = document.querySelector("#txtTimeLimit")
        this.txtPersonLimit = document.querySelector("#txtPersonLimit")
        this.txtCourse = document.querySelector("#txtCourse")
        this.btnSubscrive = document.querySelector("#btnSubscrive")
        this.btnModal = document.querySelector("#btnModal")
        this.frmRegisterTimes = document.querySelector("#frmRegisterTimes")
        this.txtUserName = document.querySelector("#txtUserName")
        this.txtUserTime = document.querySelector("#txtUserTime")
        this.myTable = document.querySelector("#myTable")
        this.btnClassification = document.querySelector("#btnClassification")
        this.imgNav = document.querySelector("#imgNav")

        this.fillEventData()
        this.initMap()
        this.fillUserData()
        this.fillAddSubscriveEvent()
        this.bindAddRegisterTimes()
        this._renderPage()
        this.renderTable(this.eventController.getElementsTime())
        this.pageLoad()
        this.showClassification()
    }

    initMap() {
        const currentEvent = this.eventController.getCurrentEvent()
        const coordBegin = currentEvent.coordBegin
        const entities = coordBegin.split("#")
        const begin = new google.maps.LatLng(parseFloat(entities[0]), parseFloat(entities[1]));

        const coordEnd = currentEvent.coordEnd
        const entities2 = coordEnd.split('#')
        const end = new google.maps.LatLng(parseFloat(entities2[0]), parseFloat(entities2[1]));

        const myMapOptions = {
          center: begin,
          zoom: 8,
          disableDefaultUI: true
        };

        const map = new google.maps.Map(
          document.getElementById("map"),
          myMapOptions
        );

        const contentString = `
          <div id="content">
            <h1>Inicio da prova</h1>
          </div>
        `

        const contentString2 = `
          <div id="content">
            <h1>Fim da prova</h1>
          </div>
        `

        const infowindow = new google.maps.InfoWindow({content: contentString})

        const infoWindow2 = new google.maps.InfoWindow({content: contentString2})

        const marker = new google.maps.Marker({
          position: begin,
          map:map
        }) 
        
        const marker2 = new google.maps.Marker({
            position: end,
            map: map
        })

        marker.addListener("click",
          () => infowindow.open(map,marker),
          infoWindow2.open(map,marker2)
        )
      }

    fillUserData() {
        const currentUser = this.userController.getCurrentUser()
        this.imgNav.src = currentUser.img
    }

    fillEventData() {
        const currentEvent = this.eventController.getCurrentEvent()
        let vagas = currentEvent.personLimit
        this.eventName.innerHTML = currentEvent.name
        this.eventLocation.innerHTML = `Localização: ${currentEvent.location}`
        this.txtDate.innerHTML = `Data: ${currentEvent.date}`
        this.txtPrice.innerHTML = `Preço: ${currentEvent.price}€`
        this.txtRetrieve.innerHTML = `Levantamento dos equipamentos: ${currentEvent.retrieve}`
        this.txtRecord.innerHTML = currentEvent.record
        this.txtTimeLimit.innerHTML = vagas
        this.txtPersonLimit.innerHTML = currentEvent.personLimit
        this.imgEvent.src = currentEvent.logo
        this.txtDesc.innerHTML = currentEvent.description
        this.txtCourse.innerHTML = `Distância: ${currentEvent.course} Km`
    }

    showClassification() {
        this.btnClassification.addEventListener('click', event => {
            event.preventDefault()
            this.myTable.style.visibility = 'visible'
            this.renderTable(this.eventController.getElementsTime())
        })
    }

    fillAddSubscriveEvent() {
        const currentEvent = this.eventController.getCurrentEvent()
        this.eventName.innerHTML = currentEvent.name
        this.btnSubscrive.addEventListener('click', event => {
            event.preventDefault()
            this.eventController.addEventTime(this.userController.loginUserTime(), '00:00:00',this.eventName.innerHTML)
            // this.renderTable(this.eventController.getElementsTime())
            this.btnSubscrive.style.visibility = 'hidden'
            this.btnClassification.style.visibility = 'visible'
        })
    }

    bindAddRegisterTimes() {
        this.frmRegisterTimes.addEventListener('submit', event => {
            event.preventDefault()
            this.eventController.removeUserTime(this.txtUserName.value, this.eventName.innerHTML)
            this.eventController.addEventTime(this.txtUserName.value, this.txtUserTime.value, this.eventName.innerHTML)

            this.renderTable(this.eventController.getElementsTime())
        })
    }

    _renderPage() {
        
        this.btnClassification.style.visibility = 'hidden'
        
        
        if(this.userController.checkLoginStatus()) {
            this.btnSubscrive.style.visibility = 'hidden';
            this.btnModal.style.visibility = 'visible';
            this.btnClassification.style.visibility = 'hidden'
            this.myTable.style.visibility = 'visible'
        } else {
            this.btnSubscrive.style.visibility = 'visible';
            this.btnModal.style.visibility = 'hidden';
            this.myTable.style.visibility = 'hidden'
            
        }
            
        
    }

    pageLoad() {
        window.onload = this.renderTable(this.eventController.getElementsTime())
    }

    renderTable(TemposProvas = []) {
        let i=1
        for (const eventTime of TemposProvas) {
            this.myTable.innerHTML += `<tr>
            <td style="color: white;">${i}º</td>
            <td style="color: white;">${eventTime.username}</td>
            <td style="color: white;">${eventTime.time}</td>
            </tr>`
            i++;
        }
    }


}