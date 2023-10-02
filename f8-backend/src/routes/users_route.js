const {
    protect,
    adminOnly,
  } = require("../middleware/authMiddleware");
  const {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    loginStatus,
    upgradeUser,
    sendAutomatedEmail,
    sendVerificationEmail,
    verifyUser,
    forgotPassword,
    resetPassword,
    changePassword,
    sendLoginCode,
    loginWithCode,
    loginWithGoogle,
    saveAPIKey,
    saveModel,
  } = require("../controllers/userController");

async function userRoute(app){
    app.post("/api/users/register", registerUser);
    app.post("/api/users/login", loginUser);
    app.get("/api/users/logout", logoutUser);
    app.get("/api/users/getUser", {protected:protect}, getUser);
    app.patch("/api/users/updateUser", {protected:protect}, updateUser);
    
    // app.delete("/api/users/:id", {protected:protect}, {adminOnly:adminOnly}, deleteUser);
    // app.get("/api/users/getUsers", {protected:protect}, {adminOnly:adminOnly}, getUsers);
    app.post("/api/users/loginStatus", loginStatus);
    // app.post("/api/users/upgradeUser", {protected:protect}, {adminOnly:adminOnly}, upgradeUser);
    app.post("/api/users/sendAutomatedEmail", {protected:protect}, sendAutomatedEmail);
    
    app.post("/api/users/sendVerificationEmail", sendVerificationEmail);
    app.patch("/api/users/verifyUser/:verificationToken", verifyUser);
    app.post("/api/users/forgotPassword", forgotPassword);
    app.patch("/api/users/resetPassword/:resetToken", resetPassword);
    app.patch("/api/users/changePassword", {protected:protect}, changePassword);
    
    app.post("/api/users/sendLoginCode/:email", sendLoginCode);
    app.post("/api/users/loginWithCode/:email", loginWithCode);
    
    app.post("/api/users/google/callback", loginWithGoogle);

    app.post("/api/users/saveApiKey", saveAPIKey);
    app.post("/api/users/saveModel", saveModel);
    // app.addHook('onRequest', async (request, reply) => {
    //   // Modify the request object or perform other tasks
    //   request.sessionStore = {user:"ss"} // Your previous decoration code
    
    //   // Continue processing the request
    // });
    // app.addHook('preHandler', (request, reply, next) => {
    //   const session = request.session;
    // })
    // app.addHook('preHandler', (req, reply, next) => {
    //   req.sessionStore.destroy(req.session.sessionId, next);
    //   next();
    // })
    app.addHook('preHandler', (request, reply, done) => {
      const session = request.session;

      // Update session expiration time
      if (session && session.expires) {
        session.touch();
      }
      done();
    });
}

module.exports = userRoute