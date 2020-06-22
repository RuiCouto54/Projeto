import UserView from './views/UserView.js';
import TeamCatalogView from './views/TeamCatalogView.js';
import TeamAddView from './views/TeamAddView.js';
import TeamDetailView from './views/TeamDetailView.js'
import EventAddView from './views/EventAddView.js';
import EventCatalogView from './views/EventCatalogView.js';
import EventDetailView from './views/EventDetailView.js';
import TrophieView from './views/TrophieView.js';
import UserDetailView from './views/UserDetailView.js';
import HomePageView from './views/HomePageView.js';
import ClassificationView from './views/ClassificationView.js';
import StoreView from './views/StoreView.js';

class App {
    constructor() {
        this.routes = {
            'index': [
                UserView,
            ],
            'teamsCatalog': [
                TeamCatalogView
            ],
            'addTeam': [
                TeamAddView
            ],
            'Team': [
                TeamDetailView
            ],
            'eventsCatalog': [
                EventCatalogView
            ],
            'addEvent': [
                EventAddView
            ],
            'event': [
                EventDetailView
            ],
            'trophies': [
                TrophieView
            ],
            'perfil': [
                UserDetailView
            ],
            'homePage': [
                HomePageView
            ],
            'classification': [
                ClassificationView
            ], 
            'store': [
                StoreView
            ]
        };

        // import dummy data for testing purposes
        this._importDataFixtures();

        // instantiate the views mapped in the routes object
        this._instantiateViews();
    }

    _instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];

        const views = this._getViews(route);

        for (const view of views) {
            new view();
        }
    }

    _getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    _importDataFixtures() {
        const equipas = [
            {
                id: 1,
                name: '100 meta',
                location: 'Porto',
                logo: '../img/Logótipo-100meta.jpg',
                description: 'Temos como lema, "Inspired by Running" e na verdade somos um grupo de amigos que se reúne todas as sextas-feiras, às 20h15, na Marina do Freixo (Porto), para em conjunto fazermos o que mais gostamos, correr e caminhar.',
                shirt: '../img/equipamento-100meta.jpg',
                color: 'orange'  
            },
            {
                id: 2,
                name: "Cães D'Avenida",
                location: 'Porto',
                logo: '../img/caes dvenida.png',
                description: 'Associação Desportiva Cães D´Avenida - Quem passeia junto ao mar na cidade do Porto em Portugal, já não estranha o movimento dos corredores que escolhem a Avenida do Brasil como o local de eleição para treinar.',
                shirt: '../img/caes davenida.png',
                color: 'white'
            },
            {
                id: 3,
                name: 'Às 4as em Belas',
                location: 'Sintra',
                logo: '../img/4as em belas.jpg',
                description: 'O À4ªemBelas é um grupo de treino de corrida pelos trilhos de Belas e Carregueira.',
                shirt: '../img/equipamento-4embelas.jpg',
                color: 'yellow'
            },
            {
                id: 4,
                name: 'Correr Queluz',
                location: 'Sintra',
                logo: '../img/correr queluz.jpg',
                description: 'Olá Boa Gente! Somos um Grupo não federado de malta que gosta de correr em Queluz e arredores. Todas as quartas-feiras, às 20:00, encontramo-nos no Parque Urbano Felício Loureiro de Queluz (na entrada dos Arcos - parque das bicicletas) para treinar.',
                shirt: '../img/equipamento-correrQueluz.png',
                color: 'yellow'
            }
        ];

        const provas = [
            {
                id: 1,
                name: 'Trail Serra dos Candeeiros',
                location: 'Pedreiras',
                date: '28 de junho',
                price: '13',
                retrieve: '28 de junho',
                record: '01:23:45',
                timeLimit: '06:00:00',
                personLimit: '1000',
                logo: '../img/trail-candeeiros.jpg',
                description: 'A prova denominada VII Trail Serra dos Candeeiros, organizada pela Casa do Povo de Pedreiras é constituída no seu percurso por trilhos, estradões, carreiros e caminhos em zona de pinhal, zonas calcárias na Serra dos Candeeiros',
                course: '21',
                coordBegin : '39.576849#-8.864133',
                coordEnd: '39.523213#-8.745032'  
            },
            {
                id: 2,
                name: 'Trail de Esposende',
                location: 'Esposende',
                date: '5 de julho',
                price: '8',
                retrieve: '5 de julho',
                record: '06:53:38',
                timeLimit: '11:00:00',
                personLimit: '1200',
                logo: '../img/trail esposende.png',
                description: 'A competição realizar-se-á ao longo da Arriba Fóssil de Esposende e terminará no Centro da Cidade, no Largo Rodrigues Sampaio.',
                course: '42',
                coordBegin : '41.531111#-8.780914',
                coordEnd: '41.532725#-8.782303'
            },
            {
                id: 3,
                name: 'Trilhos do Almourol',
                location: 'Entroncamento',
                date: '25 de julho',
                price: '5',
                retrieve: '24 de julho',
                record: '01:21:36',
                timeLimit: '05:00:00',
                personLimit: '1000',
                logo: '../img/trilhos de almourol.png',
                description: 'N/A',
                course: '21',
                coordBegin : '39.470500#-8.468257',
                coordEnd: '39.495685#-8.270751'
            },
            {
                id: 4,
                name: 'Corrida do Dragão',
                location: 'Porto',
                date: '6 de setembro',
                price: '5',
                retrieve: '6 de setembro',
                record: '00:45:51',
                timeLimit: '01:30:00',
                personLimit: '10000',
                logo: '../img/corrida do dragão.png',
                description: 'Uma corrida emblemática que nasce com o objectivo de oferecer a milhares de adeptos do FC Porto a oportunidade de correr de Dragão ao Peito, na Cidade Invicta, junto ao Estádio do Dragão, palco de todas as emoções, o palco dos campeões.',
                course: '5',
                coordBegin : '41.157922#-8.628486',
                coordEnd: '41.163237#-8.584106'
            }
        ];

        const users = [
            {
                id: 1,
                username: 'admin',
                password: 'admin'
            },
            {
                id: 2,
                username: 'user',
                password: 'user'
            }
        ];

        const posts = [
            {
                username: 'admin',
                sentence: 'Bem-Vindo ao Running Hub',
                img: '../img/img-feed2.jpg'
            },
            {
                username: 'admin',
                sentence: 'Faça como o Kevin Hart e corra connosco',
                img: '../img/img-feed.jpg'
            }
        ]

        const usersData = [
            {
                id: 1,
                username: 'admin',
                password: 'admin',
                name: 'admin',
                img:'../img/os perigosos.jpg',
                age: '19',
                location: 'PVZ',
                height: '174',
                runType: 'supinada',
                favComp: 'trail',
                averageKm: '10',
                shoe: 'nike',
                equip: 'M',
                points: 0
            },
            {
                id: 2,
                username: 'user',
                password: 'user',
                name: 'user',
                img:'../img/os perigosos.jpg',
                age: '19',
                location: 'PVZ',
                height: '174',
                runType: 'supinada',
                favComp: 'trail',
                averageKm: '10',
                shoe: 'nike',
                equip: 'M',
                points: 0
            }
        ]

        const camisolas = [
            {
                id: 1,
                name: 'Joma Race',
                brand: 'Joma',
                size: 'L',
                price: '8',
                img: '../img/joma-race.jpg'
            },
            {
                id: 2,
                name: 'Nike Dri Fit Miler',
                brand: 'Nike',
                size: 'XL',
                price: '20',
                img: '../img/nike-dri-fit-miler.jpg'
            },
            {
                id: 3,
                name: 'Adidas Own The Run',
                brand: 'Adidas',
                size: 'L',
                price: '19',
                img: '../img/adidas-own-the-run-3-stripes.jpg'
            },
            {
                id: 4,
                name: 'Joma Elite VI',
                brand: 'Joma',
                size: 'S',
                price: '13',
                img: '../img/joma-elite-vi.jpg'
            }
        ]

        const sapatilhas = [
            {
                id: 1,
                name: 'Nike Air Zoom Pegasus',
                brand: 'Nike',
                runType: 'Neutra',
                size: '39',
                price: '120',
                img: '../img/nike-air-zoom-pegasus-37.jpg' 
            },
            {
                id: 2,
                name: 'Adidas Duramo Lite 2.0',
                brand: 'Adidas',
                runType: 'Neutra',
                size: '42',
                price: '30.99',
                img: '../img/adidas-duramo-lite.jpg' 
            },
            {
                id: 3,
                name: 'Asics Gel Nimbus',
                brand: 'Asics',
                runType: 'Supinada',
                size: '39',
                price: '108',
                img: '../img/asics-gel-nimbus-21.jpg' 
            },
            {
                id: 4,
                name: 'Joma Fast',
                brand: 'Joma',
                runType: 'Pronada',
                size: '36',
                price: '28',
                img: '../img/joma-fast.jpg' 
            }
        ]

        const trofeus = [
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Participar numa prova',
                points: '100',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Participar em 10 provas',
                points: '1000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Participar em 50 provas',
                points: '5000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Participar em 100 provas',
                points: '10000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Percorrer 5 Km num dia',
                points: '50',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Percorrer 10 Km num dia',
                points: '100',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Percorrer 20 km num dia',
                points: '200',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Percorrer 50 km num dia',
                points: '500',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Vencer uma prova',
                points: '500',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Vencer 5 provas',
                points: '2500',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Vencer 10 provas',
                points: '5000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Vencer 15 provas',
                points: '7500',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Junta-se a uma equipa',
                points: '20',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Completar um desafio diário',
                points: '100',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Completar 5 desafios diários',
                points: '500',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Completar 20 desafios diários',
                points: '2000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Completar 50 desafios diários',
                points: '5000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Chegar aos 1.000 pontos',
                points: '1000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Chegar aos 5.000 pontos',
                points: '5000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Chegar aos 10.000 pontos',
                points: '10000',
                date: 'N/A'
            },
            {
                type: 'individual',
                logo: '../img/cadeado.png',
                desc: 'Chegar aos 100.000 pontos',
                points: '100000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Participar numa prova',
                points: '100',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Participar em 10 provas',
                points: '1000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Participar em 50 provas',
                points: '5000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Participar em 100 provas',
                points: '10000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Ganhar 100 pts. à equipa',
                points: '100',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Ganhar 1.000 pts. à equipa',
                points: '1000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Ganhar 5.000 pts. à equipa',
                points: '5000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Ganhar 10.000 pts. à equipa',
                points: '10000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Vencer uma prova',
                points: '500',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Vencer 5 provas',
                points: '2500',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Vencer 10 provas',
                points: '5000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Vencer 15 provas',
                points: '7500',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Pertencer 1 ano à equipa',
                points: '4000',
                date: 'N/A'
            },
            {
                type: 'coletivo',
                logo: '../img/cadeado.png',
                desc: 'Pertencer 5 anos à equipa',
                points: '10000',
                date: 'N/A'
            },

        ]

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.equipas) {
            localStorage.setItem('equipas', JSON.stringify(equipas));    
        }
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (!localStorage.provas) {
            localStorage.setItem('provas', JSON.stringify(provas));
        }
        if (!localStorage.usersData) {
            localStorage.setItem('usersData', JSON.stringify(usersData));
        }
        if (!localStorage.trofeus) {
            localStorage.setItem('trofeus', JSON.stringify(trofeus));
        }
        if (!localStorage.posts) {
            localStorage.setItem('posts', JSON.stringify(posts));
        }
        if (!localStorage.sapatilhas) {
            localStorage.setItem('sapatilhas', JSON.stringify(sapatilhas));
        }
        if (!localStorage.camisolas) {
            localStorage.setItem('camisolas', JSON.stringify(camisolas));
        }
    }

    
}

new App();