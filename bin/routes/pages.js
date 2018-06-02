const express = require('express')
const router = express.Router()

const Animal = require('../models/animal')

router.get('/', (req,res) => {
	Animal.find({}, (err, content) =>{
		if (err) throw err

		res.send(content)
	})
})

router.get('/:id', (req,res)=> { 
	Animal.find({ url: req.params.id }, (err, content) =>{
		if (err) throw err

		res.send(content[0])
	})
})

router.post('/', (req,res) => {

	const newAnimalPage = new Animal(req.body); 

	newAnimalPage.save((err,name)=>{
		if(err) throw err

		res.send({"status": "created"})
	})

})

router.put('/', (req,res) =>{
	//console.log(req.body._id)

	Animal.update({'_id': req.body._id }, req.body, (err, doc)=>{
	    if (err) return res.send(500, { error: err });
	    return res.send("Страница успешно обновлена");
	});
})

router.delete('/:id', (req,res) => {
	Animal.remove({'_id': req.params.id }, (err,doc)=>{
		if(err) return res.send(500, { error: err})

		return res.send(`Страница успешно удалена`)
	})
})

module.exports = router