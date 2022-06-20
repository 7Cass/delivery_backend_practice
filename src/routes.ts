import { Router } from 'express'
import { ensureClientAuth } from './middlewares/ensureClientAuth'
import { ensureDeliverymanAuth } from './middlewares/ensureDeliverymanAuth'
import { AuthenticateClientController } from './modules/accounts/useCases/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from './modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { FindAllDeliveriesController as FindAllDeliveriesClientController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController'
import { FindAllDeliveriesController as FindAllDeliveriesDeliverymanController } from './modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesController'
import { CreateDeliveryController } from './modules/deliveries/useCases/CreateDelivery/CreateDeliveryController'
import { FindAllAvailableController } from './modules/deliveries/useCases/FindAllAvailable/FindAllAvailableController'
import { UpdateDeliverymanController } from './modules/deliveries/useCases/UpdateDeliveryman/UpdateDeliverymanController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController'

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesClientController = new FindAllDeliveriesClientController()
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()
const updateEndDateController = new UpdateEndDateController()

routes.post('/clients/auth', authenticateClientController.handle)
routes.post('/deliveryman/auth', authenticateDeliverymanController.handle)

routes.post('/clients', createClientController.handle)
routes.post('/deliveryman', createDeliverymanController.handle)

routes.post('/delivery', ensureClientAuth, createDeliveryController.handle)
routes.get('/delivery/available', ensureDeliverymanAuth, findAllAvailableController.handle)
routes.put('/delivery/updateDeliveryman/:id', ensureDeliverymanAuth, updateDeliverymanController.handle)
routes.put('/delivery/updateEndDate/:id', ensureDeliverymanAuth, updateEndDateController.handle)
routes.get('/client/deliveries', ensureClientAuth, findAllDeliveriesClientController.handle)
routes.get('/deliveryman/deliveries', ensureDeliverymanAuth, findAllDeliveriesDeliverymanController.handle)

export default routes