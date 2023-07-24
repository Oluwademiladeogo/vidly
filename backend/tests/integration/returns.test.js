const {rentalschema} = require("../../models/rentalschema")
const mongoose =require("mongoose")

describe("api/returns", ()=>{
    let server;
    let CustomerId;
    let movieId;
    let rental;

    beforeEach(async()=>{
        server = require("../../main.js")
        CustomerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        rental = new rentalschema({
            customer: {
                _id: CustomerId,
                name: 'demilade',
                phone: '55555'
            },
            movie: {
                _id: movieId,
                title: '123456',
                dailyRentalRate: 2
            }
        })
        
    })
    afterEach(async()=> { 
        server.close() 
        rental.remove({})
    })
    it('should work', async()=>{
        const result = await rentalschema.findById
        expect(result).not.toBeNull();
    })
})