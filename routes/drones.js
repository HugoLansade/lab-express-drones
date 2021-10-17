const express = require('express');
const router = express.Router();
const droneModel = require("./../models/Drone.model")
// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  droneModel.find()
    .then((allDrones) => res.render("drones/list", { allDrones }))
    .catch(next);
});

router.get('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    res.render("drones/create-form.hbs");
  } catch (err){
    res.send("fatal error");
  }
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    await droneModel.create( req.body )
    res.redirect("/drones")
  } catch (err) {
    next(err);
  }
});

// router.get('/drones/:id([a-z0-9]{24})/update', async (req, res, next) => {
//   // Iteration #4: Update the drone
//   try{
//     await droneModel.findById(req.params.id)
//     res.render("drones/update-form.hbs");
//   } catch (err) {
//     res.send("fatal error");
//   }
// });

router.get('/drones/:id([a-z0-9]{24})/update', function (req, res, next) {
  // Iteration #4: Update the drone
 droneModel.findById(req.params.id)
  .then((drone) => res.render("drones/update-form.hbs", {drone}))
  .catch(next);
});

// router.post('/drones/:id([a-z0-9]{24})/update', async (req, res, next) => {
//   // Iteration #4: Update the drone
//   try {
//     await droneModel.findByIdAndUpdate(req.params.id, req.body)
//     res.redirect("/drones")
//   } catch (err) {
//     res.send("fatal error");
//   }
// });

// router.post('/drones/:id([a-z0-9]{24})/update', async function (req, res, next) {
//   // Iteration #4: Update the drone
//   try {
//     await droneModel.findByIdAndUpdate(req.params.id, req.body )
//     res.redirect("/drones")
//   } catch (err) {
//     res.send("fatal error");
//   }
// });


//remettre
router.post('/drones/:id([a-z0-9]{24})/update', (req, res, next) => {
  droneModel.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.redirect("/drones"))
  .catch(next);
});

router.post('/drones/:id([a-z0-9]{24})/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  droneModel.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/drones"))
    .catch(next);
});



module.exports = router;
