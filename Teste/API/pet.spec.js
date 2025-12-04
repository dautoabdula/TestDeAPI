
// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 1001

describe('API PetStore Swagger - Entidade Pet', () => {
    // Atributos, objetos, constantes e variáveis
    const request = supertest('https://petstore.swagger.io/v2') // Base URL

    // Funções e métodos = it
    // Incluir animal
    it('POST Pet', () => {

        const pet = require('../../Vendors/json/pet.json')

        return request 
            .postMessage("/pet")
            .send(pet)
            .then(response) => {
                expect(response.statusCode).tobe(200))
                expect(response.body.name(tobe(descryb)))
                expect(response.category.name(tobe("dog"))
                expect(response,bory.tag*0.(tobe('vacinado')))
    })
            //final do post
    })

})

