const userCtrl = require("./../app/controllers/user");
const productCtrl = require("./../app/controllers/product");
const clientCtrl = require("./../app/controllers/client");
const authService = require("./../services/auth");

const appRouter = (router) => {

    router.get("/", (req, res) => {
        res.json({ message: "Welcome to our RestFull API!" });   
    });
  	router.post("/authenticate", userCtrl.authenticate);
  	router.post("/register",userCtrl.create);
    router.use(authService.valideToken);

    /**
     * @swagger
     * components:
     *   schemas:
     *     product:
     *       properties:
     *         name:
     *           type: string
     *         description:
     *           type: string
     *         category:
     *           type: string
     *           example: computers|phones|accesories
     *   securitySchemes:
     *     beaberAuth:
     *       type: http
     *       scheme: bearer
     *       in: header
     *       name: access-token
     *
     * /product:
     *   get:
     *     tags:
     *       - Products
     *     description: Returns all products
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of products
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 products:
     *                   type: array
     *                   items:
     *                     type: object 
     *       401:
     *         description: No token provided.        
     */
    router.route("/product")
        .get(productCtrl.getProducts);


    /**
     * @swagger
     * /product/{id}:
     *   get:
     *     tags:
     *       - Products
     *     description: Get specific product
     *     parameters:
     *       - name: id
     *         description: Product id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Get product by id
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 product:
     *                   $ref: '#/components/schemas/product' 
     *       401:
     *         description: No token provided.
     *       404:
     *         description: Product not found.
     */
    router.route("/product/:productId")
        .get(productCtrl.getProduct);

     /**
     * @swagger
     * /product:
     *   post:
     *     tags:
     *       - Products
     *     description: Creates a new product
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: product
     *         description: product data
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/product'
     *     responses:
     *       200:
     *         description: Successfully created product
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 product:
     *                   $ref: '#/components/schemas/product' 
     *       401:
     *         description: No token provided.
     */
    router.route("/product")
        .post(productCtrl.saveProduct);

    /**
     * @swagger
     * /product/{id}:
     *   put:
     *     tags:
     *       - Products
     *     description: Updates a single product
     *     produces: application/json
     *     parameters:
     *       - name: id
     *         description: Product id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *       - name: product
     *         description: product data
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/product'
     *     responses:
     *       200:
     *         description: Successfully product updated
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 product:
     *                   $ref: '#/components/schemas/product' 
     *       401:
     *         description: No token provided.
     *       404:
     *         description: Product not found.
     */
    router.route("/product/:productId")
        .put(productCtrl.updateProduct);

     /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     tags:
     *       - Products
     *     description: Deletes a single product
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Product id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successfully deleted product
     *         schema:
     *           properties:
     *             message:
     *              type: string
     *       401:
     *         description: No token provided.
     *       404:
     *         description: Product not found.
     */
    router.route("/product/:productId")
        .delete(productCtrl.deleteProduct);

     router.route("/product/sale/:productId")
        .put(productCtrl.registerSale);
     router.route("/product/sale/:productId")
        .get(productCtrl.getSales);

    /**
     * @swagger
     * components:
     *   schemas:
     *     client:
     *       properties:
     *         name:
     *           type: string
     *         age:
     *           type: number
     *   securitySchemes:
     *     beaberAuth:
     *       type: http
     *       scheme: bearer
     *       in: header
     *       name: access-token
     *
     * /client:
     *   get:
     *     tags:
     *       - Clientss
     *     description: Returns all clients
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of clientts
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 clients:
     *                   type: array
     *                   items:
     *                     type: object 
     *       401:
     *         description: No token provided.        
     */
    router.route("/client")
        .get(clientCtrl.getClients);


    /**
     * @swagger
     * /client/{id}:
     *   get:
     *     tags:
     *       - Clients
     *     description: Get specific client
     *     parameters:
     *       - name: id
     *         description: client id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Get client by id
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 client:
     *                   $ref: '#/components/schemas/client' 
     *       401:
     *         description: No token provided.
     *       404:
     *         description: client not found.
     */
    router.route("/client/:clientId")
        .get(clientCtrl.getClient);

     /**
     * @swagger
     * /client:
     *   post:
     *     tags:
     *       - Clients
     *     description: Creates a new client
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: client
     *         description: client data
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/client'
     *     responses:
     *       200:
     *         description: Successfully created client
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 client:
     *                   $ref: '#/components/schemas/client' 
     *       401:
     *         description: No token provided.
     */
    router.route("/client")
        .post(clientCtrl.saveClient);

    /**
     * @swagger
     * /client/{id}:
     *   put:
     *     tags:
     *       - Clients
     *     description: Updates a single client
     *     produces: application/json
     *     parameters:
     *       - name: id
     *         description: client id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *       - name: client
     *         description: client data
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/client'
     *     responses:
     *       200:
     *         description: Successfully client updated
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 client:
     *                   $ref: '#/components/schemas/client' 
     *       401:
     *         description: No token provided.
     *       404:
     *         description: client not found.
     */
    router.route("/client/:clientId")
        .put(clientCtrl.updateClient);

     /**
     * @swagger
     * /client/{id}:
     *   delete:
     *     tags:
     *       - Clientss
     *     description: Deletes a single client
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: client id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successfully deleted client
     *         schema:
     *           properties:
     *             message:
     *              type: string
     *       401:
     *         description: No token provided.
     *       404:
     *         description: client not found.
     */
    router.route("/client/:clientId")
        .delete(clientCtrl.deleteClient);
    router.route("/private")
        .get(userCtrl.privateTest);
};

module.exports = appRouter;