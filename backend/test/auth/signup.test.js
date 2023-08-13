process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("../../server");
const sinon = require("sinon");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

describe("verification of signup calls to the server", () => {
  it("Successful Signup", (done) => {
    const signUpBody = {
      name: "Random singh",
      email: "random0@gmail.com",
      password: "qwerty",
    };

    const userFindOneStub = sinon
      .stub(User, "findOne")
      .resolves(null);

    const bcryptStub = sinon
      .stub(bcrypt, "hashSync")
      .returns("$2b$04$ywFAvBgfDX7XBH/CFYxG1uGWZy4i7JFTjZ37xuXcYJprR/DG9aPgm");

    const userSaveStub = sinon.stub(User.prototype, "save").resolves();
    chai
      .request(server)
      .post("/api/auth/signup")
      .send(signUpBody)
      .end((err, res) => {
        const {
          status,
          body: { msg },
        } = res;

        expect(status).equal(200);
        expect(msg).equal("Account created Successfully!");
        expect(userFindOneStub.calledOnce).to.be.true;
        expect(userSaveStub.calledOnce).to.be.true;
        expect(bcryptStub.calledOnce).to.be.true;
        userFindOneStub.restore();
        userSaveStub.restore();
        bcryptStub.restore();
        done();
      });
  });

  it("Unsuccessful signup due to already present email", (done) => {
    const signUpBody = {
      name: "Kartik Katiyar",
      email: "katiyarkartik0@gmail.com",
      password: "qwerty",
    };

    const userFindOneStub = sinon.stub(User, "findOne").resolves({
      _id: "64bf7fdbedc92015d28dd35e",
      name: "Kartik Katiyar",
      email: "katiyarkartik0@gmail.com",
      password: "$2b$04$ywFAvBgfDX7XBH/CFYxG1uGWZy4i7JFTjZ37xuXcYJprR/DG9aPgm",
      isAdmin: false,
      __v: 0,
    });

    chai
      .request(server)
      .post("/api/auth/signup")
      .send(signUpBody)
      .end((err, res) => {
        const {
          status,
          body: { msg },
        } = res;

        expect(status).equal(400);
        expect(msg).equal(
          "user with this email already exists, try signing in with some other email"
        );
        expect(userFindOneStub.calledOnce).to.be.true;
        userFindOneStub.restore();
        done();
      });
  });

  //   it("Unsuccessful Login due to invalid username", (done) => {
  //     const signInBody = {
  //       username: "katiyarswastik0@newsagg",
  //       password: "randomPasswordInput",
  //     };

  //     const getUserStub = sinon.stub(Validator.prototype, "getUser").resolves({
  //       usersData: null,
  //       isEmailValid: false,
  //       msg: "email address entered is not valid",
  //     });

  //     chai
  //       .request(server)
  //       .post("/api/auth/login")
  //       .send(signInBody)
  //       .end((err, res) => {
  //         expect(res.status).equal(400);
  //         expect(res.body.msg).equal("email address entered is not valid");
  //         expect(getUserStub.calledOnce).to.be.true;
  //         getUserStub.restore();
  //         done();
  //       });
  //   });

  //   it("Unsuccessful Login due to valid but unknown username", (done) => {
  //     const signInBody = {
  //       username: "katiyarkartik1@gmail.com",
  //       password: "qwerty",
  //     };

  //     const getUserStub = sinon.stub(Validator.prototype, "getUser").resolves({
  //       isEmailValid: true,
  //       userData: null,
  //       msg: "email not found, try signing-up first",
  //     });

  //     chai
  //       .request(server)
  //       .post("/api/auth/login")
  //       .send(signInBody)
  //       .end((_, res) => {
  //         const {
  //           status,
  //           body: { msg },
  //         } = res;
  //         expect(status).equal(400);
  //         expect(msg).equal("email not found, try signing-up first");
  //         expect(getUserStub.calledOnce).to.be.true;
  //         getUserStub.restore();
  //         done();
  //       });
  //   });

  //   it("Unsuccessful Login due to invalid password", (done) => {
  //     const signInBody = {
  //       username: "katiyarkartik0@gmail.com",
  //       password: "wrongpasswordinput",
  //     };

  //     const getUserStub = sinon.stub(Validator.prototype, "getUser").resolves({
  //       userData: {
  //         _id: "64bf7fdbedc92015d28dd35e",
  //         name: "Kartik Katiyar",
  //         email: "katiyarkartik0@gmail.com",
  //         password:
  //           "$2b$04$ywFAvBgfDX7XBH/CFYxG1uGWZy4i7JFTjZ37xuXcYJprR/DG9aPgm",
  //         isAdmin: false,
  //         __v: 0,
  //       },
  //       msg: "user exists, we are good to login ",
  //       isEmailValid: true,
  //     });

  //     const bcryptStub = sinon.stub(bcrypt, "compareSync").returns(false);

  //     chai
  //       .request(server)
  //       .post("/api/auth/login")
  //       .send(signInBody)
  //       .end((_, res) => {
  //         const {
  //           status,
  //           body: { msg, accessToken, isPasswordValid },
  //         } = res;

  //         expect(status).equal(400);
  //         expect(msg).equal("invalid password");
  //         expect(accessToken).equal(null);
  //         expect(isPasswordValid).equal(false);
  //         expect(getUserStub.calledOnce).to.be.true;
  //         expect(bcryptStub.calledOnce).to.be.true;
  //         getUserStub.restore();
  //         bcryptStub.restore();
  //         done();
  //       });
  //   });
});
