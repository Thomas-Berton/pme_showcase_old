import React from "react";
import toast from "react-hot-toast";
import createDOMPurify from "dompurify";

import api from "../../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DOMPurify = createDOMPurify(window);

function RepeatButton(props) {
  return (
    <button
      disabled={props.disable}
      aria-label="Play again."
      className={
        props.style +
        " mb-4 py-6 hover:scale-110 text-gray-50 text-base dark:text-gray-800 text-center leading-6 font-extrabold items-center shadow-xl sm:text-xl rounded-full cursor-pointer px-12 bg-gradient-to-r from-yellow-300 to-yellow-400"
      }
      id="repeatButton"
      onClick={props.onClick}
    >
      <FontAwesomeIcon className="mr-2" icon={["fad", "gamepad-modern"]} />
      Jouer
    </button>
  );
}

function WinningSound() {
  return (
    <audio autoPlay="autoplay" className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}

class SlotMachine extends React.Component {

  constructor(props) {
    super(props);
    let hasAlreadyPlayed = localStorage.getItem("countSlot")
      ? localStorage.getItem("countSlot")
      : 3;

    this.state = {
      winner: null,
      count: hasAlreadyPlayed,
      email: "",
    };
    this.finishHandler = this.finishHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleGameForm(e) {
    this.setState({ email: DOMPurify.sanitize(e.target.value) });
  }

  async submitGameForm(e, _this) {
    const { email } = _this.state;

    e.preventDefault();

    if (email) {
      let req = await api.General.game({
        data: {
          email,
        },
      });

      return req.status === 200
        ? toast.success("Email envoyée avec succès")
        : toast.error("Erreur lors de l'envoi");
    } else {
      return toast.error("Veuilez renseigner votre email");
    }
  }

  handleClick(state) {
    const { count } = this.state;

    localStorage.setItem("countSlot", count - 1);

    this.setState({ count: count - 1 });

    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();
  }

  static loser = [
    "Pas tout à fait",
    "Arrête de jouer",
    "Hé, tu as perdu !",
    "Aïe ! J'ai senti ça",
    "Ne vous culpabilisez pas",
    "L'argent de l'université s'envole",
    "J'ai un chat. Tu as une perte",
    "Tu es génial pour perdre",
    "Coder est difficile",
    "Ne déteste pas le codeur",
  ];

  static matches = [];

  finishHandler(value) {
    SlotMachine.matches.push(value);
    if (SlotMachine.matches.length === 3) {
      const { winner } = this.state;
      const first = SlotMachine.matches[0];
      let results = SlotMachine.matches.every((match) => match === first);
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    SlotMachine.matches = [];
  }

  render() {
    const { winner } = this.state;
    const { count } = this.state;
    const { email } = this.state;

    let repeatButton =
      (winner == true || count == 0) ? null : (
        <RepeatButton
          onClick={this.handleClick}
          disable={true}
          style="cursor-not-allowed"
        />
      );
    let winningSound = null;

    if (winner !== null && count > 0) {
      repeatButton = (
        <RepeatButton onClick={this.handleClick} disable={false} />
      );
    }

    if (winner) {
      winningSound = <WinningSound />;
    }

    return (
      <div className="h-full flex justify-around flex-col items-center mt-2">

        {/* WINNING SOUND */}
        {winningSound}

        {/* TRY COUNT */}
        <span className="raleway text-xl sm:text-3xl text-gray-900 dark:text-gray-50 tracking-wide font-bold counterContainer text-center  block w-fit ">
          <FontAwesomeIcon
            className="mb-1 text-4xl text-yellow-500"
            icon={["fad", "dice"]}
          />{" "}Essais:{" "}
          <span
            id="counterId"
            className="counterSlot text-5xl sm:text-6xl text-yellow-400"
          >
            {count}
          </span>
        </span>

        {/* WIN DISPLAY RESULT */}
        <div
          className={
            (winner === null ? "hidden " : winner ? "" : "hidden ") +
            " counterSlot winning text-5xl sm:text-8xl text-yellow-400 tracking-wide font-bold py-20"
          }
        >
          <FontAwesomeIcon
            className=" mb-1 text-6xl text-yellow-500 mr-2"
            icon={["fad", "medal"]}
          />
          Gagné !
        </div>

        {/* LOSE DISPLAY RESULT */}
        <div
          className={
            (winner === null
              ? "hidden "
              : !winner && count == 0
                ? ""
                : "hidden ") +
            " counterSlot loosing text-5xl sm:text-8xl text-red-600  tracking-wide font-bold py-20"
          }
        >
          <FontAwesomeIcon
            className=" mb-1 text-6xl text-red-600 mr-2"
            icon={["fad", "face-sad-tear"]}
          />
          Perdu !
        </div>

        {/* SPINNERS */}
        <div
          className={
            (winner === null
              ? ""
              : winner == true || count == 0
                ? "hidden-force "
                : "") + ` spinner-container`
          }
        >
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child1 = child;
            }}
            timer="1000"
          />
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child2 = child;
            }}
            timer="1400"
          />
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child3 = child;
            }}
            timer="2200"
          />
          <div className="gradient-fade"></div>
        </div>

        {/* REPLAY BUTTON */}
        <div className="h-20 flex justify-center items-center flex-row w-full absolute bottom-0" >
          {winner || count == 0 ? '' : repeatButton}
        </div>

        <div
          className={
            (winner === null
              ? "hidden "
              : winner == true || count == 0
                ? ""
                : "hidden ") + " mb-10 mx-6 sm:mx-10 xl:mx-20 winSection"
          }
        >

          {/* WIN DISPLAY RESULT  */}
          <p className="raleway text-gray-800 dark:text-gray-50 tracking-wide mr-auto text-left font-medium text-sm md:text-md mb-4 flex items-center">
            <FontAwesomeIcon
              className=" text-4xl text-yellow-500 mr-2"
              icon={["fad", "square-envelope"]}
            />
            {winner
              ? "Renseignez votre Email pour être contacté par nos équipes !"
              : "Tentez de gagner un code promo en étant tiré au sort"}
          </p>

          {/* SUBMIT RESULTS */}
          <form
            onSubmit={(e) => {
              this.submitGameForm(e, this);
            }}
            className="mr-auto z-50 flex items-center justify-start"
          >
            <input
              name="email"
              onChange={(e) => {
                this.handleGameForm(e);
              }}
              value={email}
              className="py-4 w-3/4 h-15 sm:h-22 border-2 border-yellow-200 border-r-0 rounded-bl-xl rounded-tl-xl  text-yellow-500 focus:ring focus:ring-yellow-100 focus:border-yellow-500 my-0"
              placeholder="Email"
              type="email"
            />
            <button
              type="submit"
              className="text-yellow-500 h-full font-bold rounded-br-xl rounded-tr-xl raleway border-2 border-yellow-200 p-4 bg-yellow-200 text-base"
            >
              <FontAwesomeIcon
                className=" text-base text-yellow-500 mr-2 hidden md:inline"
                icon={["fad", "paper-plane-top"]}
              />
              Envoyer
            </button>
          </form>
        </div>

      </div>
    );
  }
}

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    let hasAlreadyPlayed = localStorage.getItem("countSlot")
      ? localStorage.getItem("countSlot")
      : 3;
    this.state = {
      countCheck: hasAlreadyPlayed,
    };
  }

  forceUpdateHandler() {
    this.reset();
  }

  reset() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  state = {
    position: 0,
    lastPosition: null,
  };
  static iconHeight = 188;
  multiplier = Math.floor(Math.random() * (4 - 1) + 1);

  start = this.setStartPosition();
  speed = Spinner.iconHeight * this.multiplier;

  setStartPosition() {
    return Math.floor(Math.random() * 9) * Spinner.iconHeight * -1;
  }

  moveBackground() {
    this.setState({
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100,
    });
  }

  getSymbolFromPosition() {
    let { position } = this.state;
    const totalSymbols = 9;
    const maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1;
    let moved = (this.props.timer / 100) * this.multiplier;
    let startPosition = this.start;
    let currentPosition = startPosition;

    for (let i = 0; i < moved; i++) {
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }
    }

    this.props.onFinish(currentPosition);
  }

  tick() {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
      this.getSymbolFromPosition();
    } else {
      this.moveBackground();
    }
  }

  componentDidMount() {
    const { countCheck } = this.state;

    if (countCheck > 0) {
      clearInterval(this.timer);

      this.setState({
        position: this.start,
        timeRemaining: this.props.timer,
      });

      this.timer = setInterval(() => {
        this.tick();
      }, 100);
    }
  }

  render() {
    let { position, current } = this.state;

    return (
      <div
        style={{ backgroundPosition: "0px " + position + "px" }}
        className={`icons`}
      />
    );
  }
}

export default SlotMachine;
