process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const server = require("../../server");
const sinon = require("sinon");
const { Validator } = require("../../helpers/validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

describe("verification of login calls to the server", () => {
  it("Successful Login", (done) => {
    const signInBody = {
      email: "katiyarkartik0@gmail.com",
      password: "qwerty",
    };

    const getUserStub = sinon.stub(Validator.prototype, "getUser").resolves({
      userData: {
        _id: "64bf7fdbedc92015d28dd35e",
        name: "Kartik Katiyar",
        email: "katiyarkartik0@gmail.com",
        password:
          "$2b$04$ywFAvBgfDX7XBH/CFYxG1uGWZy4i7JFTjZ37xuXcYJprR/DG9aPgm",
        isAdmin: false,
        __v: 0,
      },
      msg: "user exists, we are good to login ",
      isEmailValid: true,
    });

    const jwtStub = sinon.stub(jwt, "sign").returns("stubbedAccessToken");

    const bcryptStub = sinon.stub(bcrypt, "compareSync").returns(true);

    chai
      .request(server)
      .post("/api/auth/login")
      .send(signInBody)
      .end((err, res) => {
        const {
          status,
          body: { msg, accessToken },
        } = res;

        expect(status).equal(200);
        expect(msg).equal("login successful");
        expect(typeof accessToken).equal("string");
        expect(getUserStub.calledOnce).to.be.true;
        expect(jwtStub.calledOnce).to.be.true;
        expect(bcryptStub.calledOnce).to.be.true;
        getUserStub.restore();
        jwtStub.restore();
        bcryptStub.restore();
        done();
      });
  });
  it("Unsuccessful Login due to invalid username", (done) => {
    const signInBody = {
      email: "katiyarswastik0@newsagg",
      password: "randomPasswordInput",
    };

    const getUserStub = sinon.stub(Validator.prototype, "getUser").resolves({
      usersData: null,
      isEmailValid: false,
      msg: "email address entered is not valid",
    });

    chai
      .request(server)
      .post("/api/auth/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.msg).equal("email address entered is not valid");
        expect(getUserStub.calledOnce).to.be.true;
        getUserStub.restore();
        done();
      });
  });

  it("Unsuccessful Login due to valid but unknown username", (done) => {
    const signInBody = {
      email: "katiyarkartik1@gmail.com",
      password: "qwerty",
    };

    const getUserStub = sinon.stub(Validator.prototype, "getUser").resolves({
      isEmailValid: true,
      userData: null,
      msg: "email not found, try signing-up first",
    });

    chai
      .request(server)
      .post("/api/auth/login")
      .send(signInBody)
      .end((_, res) => {
        const {
          status,
          body: { msg },
        } = res;
        expect(status).equal(400);
        expect(msg).equal("email not found, try signing-up first");
        expect(getUserStub.calledOnce).to.be.true;
        getUserStub.restore();
        done();
      });
  });

  it("Unsuccessful Login due to invalid password", (done) => {
    const signInBody = {
      email: "katiyarkartik0@gmail.com",
      password: "wrongpasswordinput",
    };

    const getUserStub = sinon.stub(Validator.prototype, "getUser").resolves({
      userData: {
        _id: "64bf7fdbedc92015d28dd35e",
        name: "Kartik Katiyar",
        email: "katiyarkartik0@gmail.com",
        password:
          "$2b$04$ywFAvBgfDX7XBH/CFYxG1uGWZy4i7JFTjZ37xuXcYJprR/DG9aPgm",
        isAdmin: false,
        __v: 0,
      },
      msg: "user exists, we are good to login ",
      isEmailValid: true,
    });

    const bcryptStub = sinon.stub(bcrypt, "compareSync").returns(false);

    chai
      .request(server)
      .post("/api/auth/login")
      .send(signInBody)
      .end((_, res) => {
        const {
          status,
          body: { msg, accessToken, isPasswordValid },
        } = res;

        expect(status).equal(400);
        expect(msg).equal("invalid password");
        expect(accessToken).equal(null);
        expect(isPasswordValid).equal(false);
        expect(getUserStub.calledOnce).to.be.true;
        expect(bcryptStub.calledOnce).to.be.true;
        getUserStub.restore();
        bcryptStub.restore();
        done();
      });
  });
});