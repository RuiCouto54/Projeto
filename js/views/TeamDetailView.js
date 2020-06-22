import TeamController from '../controllers/TeamController.js'
import UserController from '../controllers/UserController.js'

export default class TeamDetailView {
    constructor() {
        this.teamController = new TeamController()
        this.userController = new UserController()

        //DOM
        this.teamName = document.querySelector("#txtTeamName")
        this.teamLocation = document.querySelector("#txtLocation")
        this.teamEquip = document.querySelector("#imgEquip")
        this.teamEmblem = document.querySelector("#imgEmblem")
        this.teamDesc = document.querySelector("#txtDesc")
        this.DescColor = document.querySelector("#txtDescColor")
        this.btnEnterTeam = document.querySelector("#btnEnterTeam")
        this.tableMembers = document.querySelector("#tableMembers tbody")
        this.imgNav = document.querySelector("#imgNav")
        this.mapa = document.querySelector("#map")

        // this.teste()
        
        this.renderTable(this.teamController.getMembers())
        this.initMap()
        this.fillUserData()
        this.fillTeamData()
        this.subscriveMember()
        
        
    } 

    initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: 41.4079700, lng: -8.5197800 },
            disableDefaultUI: true
          });
          const geocoder = new google.maps.Geocoder();
        this.geocodeAddress(geocoder, map)
        }
        
    
        geocodeAddress(geocoder, resultsMap) {
            const currentTeam = this.teamController.getCurrentTeam()
          const address = currentTeam.location
          geocoder.geocode({ 'address': address },
            (results, status) => {
              if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                const marker = new google.maps.Marker({
                  map: resultsMap,
                  position: results[0].geometry.location
                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
    }

    

    fillUserData() {
        const currentUser = this.userController.getCurrentUser()
        this.imgNav.src = currentUser.img
    }

    fillTeamData() {
        const currentTeam = this.teamController.getCurrentTeam()
        this.teamName.innerHTML = currentTeam.name
        this.teamLocation.innerHTML = `Localização: ${currentTeam.location}`
        this.teamEquip.src = currentTeam.shirt
        this.teamEmblem.src = currentTeam.logo
        this.teamDesc.innerHTML = currentTeam.description
        this.DescColor.style.color = currentTeam.color
        this.teamName.style.color = currentTeam.color
    }

    subscriveMember() {
        const currentTeam = this.teamController.getCurrentTeam()
        this.teamName.innerHTML = currentTeam.name
        this.btnEnterTeam.addEventListener('click', event => {
            event.preventDefault()
            this.teamController.addTeamMember(this.userController.loginUserTime(), this.teamName.innerHTML)
            this.renderTable(this.teamController.getMembers())
        })
    }

    renderTable(equipasMembros = []) {
        let i=1
        let result = ''
        for (const membro of equipasMembros) {
            result += `<tr>
            <td style="color: white;">${i}º Lugar</td>
            <td style="color: white;">${membro.username}</td>
            <td style="color: white;">N/A</td>
            <td style="color: white;">100pts</td>
            </tr>`
            i++;
        }
        this.tableMembers.innerHTML += result;
    }
}