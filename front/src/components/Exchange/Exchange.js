import React, { useEffect, useState, useRef, forwardRef } from "react";
import { withTranslation } from "react-i18next";


import "./Exchange.module.scss";
import ContentExchange from "../../components/ContentExchange/ContentExchange";
import SVGBallon from "./SVGBallon";

export const Emoji = (props) => (<span
  className="emoji"
  role="img"
  aria-label={props.label ? props.label : ""}
  aria-hidden={props.label ? "false" : "true"}
>
  {props.symbol}
</span>
);

const Exchange = (props) => {

  const { t } = props;

  const [isActive, setActive] = useState(false);
  const [ballonReload, setballonReload] = useState(false);

  // references declarations
  const svg = useRef();
  const balloon = useRef();
  const balloon__head_group = useRef();
  const balloon__effect = useRef();
  const balloon__head = useRef();
  const balloon__tail = useRef();
  const balloon__broken_pieces = useRef();
  const balloon__broken_piece1 = useRef();
  const balloon__broken_piece2 = useRef();
  const balloon__broken_piece3 = useRef();
  const balloon__broken_piece4 = useRef();
  const balloon__broken_piece5 = useRef();
  const balloon__broken_piece6 = useRef();
  const balloon__broken_piece7 = useRef();
  const clickBallon = useRef();
  const svg_wrapper = useRef();




  // Balloon animation functions 

  function backward(callback) {
    let flag = false;
    return function (n) {
      callback(flag ? 1 - n : n);

      if (n >= 1) {
        flag = !flag;
      }
    };
  }

  function outexpo(callback) {
    return function (n) {
      callback(1 == n ? n : 1 - Math.pow(2, -10 * n));
    };
  }

  function step(callback, loop, duration) {
    let reqId = 0;
    let startTime = 0;

    const stepping = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const pastTime = timestamp - startTime;
      const progress = pastTime / duration;

      if (pastTime >= duration) {
        callback(1);

        if (loop) {
          startTime = timestamp;
        } else {
          return;
        }
      } else {
        callback(progress);
      }

      reqId = window.requestAnimationFrame(stepping);
    };

    reqId = window.requestAnimationFrame(stepping);
    return {
      stop() {
        window.cancelAnimationFrame(reqId);
      },
    };
  }

  function createTransformer() {
    const cache = [];
    return function (element) {
      let transformer = cache.find((t) => t._element === element);

      if (transformer) {
        return transformer;
      }

      transformer = {
        _element: element,
        _scale: 1,
        _translateX: 0,
        _translateY: 0,
        _rotate: 0,

        scale(value) {
          this._scale = value;
          return this;
        },

        translate(x, y) {
          this._translateX = x;
          this._translateY = y;
          return this;
        },

        rotate(value) {
          this._rotate = value;
          return this;
        },

        update() {
          const { _scale, _translateX, _translateY, _rotate } = this;
          this._element.style.transform = `translate(${_translateX}px, ${_translateY}px) scale(${_scale}) rotate(${_rotate}deg)`;
        },
      };
      cache.push(transformer);
      return transformer;
    };
  }

  function getBaseRatio(svgElement) {
    const baseWidth = svgElement.viewBox.baseVal.width;
    const baseHeight = svgElement.viewBox.baseVal.height;
    const { width, height } = svgElement.getBoundingClientRect();
    return {
      x: baseWidth / width,
      y: baseHeight / height,
    };
  }

  function toggleActivate() {
    setActive(!isActive);
  };

  function reloadBallond() {
    setActive(false);
  };

  function getOriginPosition(svgElement, element, xOffset, yOffset, ratio) {
    const { left, top, width, height } = element.getBoundingClientRect();
    const baseLeft = svgElement.getBoundingClientRect().left;
    const baseTop = svgElement.getBoundingClientRect().top;
    const x = (left - baseLeft) * ratio.x;
    const y = (top - baseTop) * ratio.y;
    return {
      x: width * ratio.x * (xOffset / 100) + x,
      y: height * ratio.y * (yOffset / 100) + y,
    };
  }

  function setOriginPosition(element, position) {
    element.style.transformOrigin = `${position.x}px ${position.y}px`;
  }

  function getSinY(x, degree, progress) {
    return Math.sin((degree * Math.PI) / 180) * progress * x;
  }


  // Balloon animation handler 
  useEffect(() => {

    const svgElement = svg.current;
    const balloonElement = balloon.current;
    const balloon__head_groupElement = balloon__head_group.current;
    const balloon__effectElement = balloon__effect.current;
    const balloon__headElement = balloon__head.current;
    const balloon__tailElement = balloon__tail.current;
    const balloon__broken_piecesElement = balloon__broken_pieces.current;
    const balloon__broken_piece1Element = balloon__broken_piece1.current;
    const balloon__broken_piece2Element = balloon__broken_piece2.current;
    const balloon__broken_piece3Element = balloon__broken_piece3.current;
    const balloon__broken_piece4Element = balloon__broken_piece4.current;
    const balloon__broken_piece5Element = balloon__broken_piece5.current;
    const balloon__broken_piece6Element = balloon__broken_piece6.current;
    const balloon__broken_piece7Element = balloon__broken_piece7.current;
    const clickBallonElement = clickBallon.current;

    const ratio = getBaseRatio(svgElement);

    const transformer = createTransformer();

    setOriginPosition(balloon__head_groupElement, getOriginPosition(svgElement, balloon__head_groupElement, 50, 100, ratio));
    setOriginPosition(balloon__effectElement, getOriginPosition(svgElement, balloon__effectElement, 50, 60, ratio));
    setOriginPosition(balloon__broken_piecesElement, getOriginPosition(svgElement, balloon__broken_piecesElement, 48, 108, ratio));
    setOriginPosition(balloon__broken_piece1Element, getOriginPosition(svgElement, balloon__broken_piece1Element, 47, 100, ratio));
    setOriginPosition(balloon__broken_piece2Element, getOriginPosition(svgElement, balloon__broken_piece2Element, 50, 50, ratio));
    setOriginPosition(balloon__broken_piece3Element, getOriginPosition(svgElement, balloon__broken_piece3Element, 50, 50, ratio));
    setOriginPosition(balloon__broken_piece4Element, getOriginPosition(svgElement, balloon__broken_piece4Element, 50, 50, ratio));
    setOriginPosition(balloon__broken_piece5Element, getOriginPosition(svgElement, balloon__broken_piece5Element, 50, 50, ratio));
    setOriginPosition(balloon__broken_piece6Element, getOriginPosition(svgElement, balloon__broken_piece6Element, 50, 50, ratio));
    setOriginPosition(balloon__broken_piece7Element, getOriginPosition(svgElement, balloon__broken_piece7Element, 50, 50, ratio));

    const bouncer = step(
      backward((n) => {
        transformer(balloonElement)
          .translate(0, n * -60)
          .update();
      }),
      true,
      3000
    );

    const tilter = step(
      backward((n) => {
        const rotate = -10 + n * 20;
        transformer(balloon__head_groupElement).rotate(rotate).update();
        transformer(balloon__broken_piecesElement).rotate(rotate).update();
        transformer(balloon__broken_piece1Element).rotate(rotate).update();
      }),
      true,
      9000
    );

    balloon__headElement.addEventListener("click", () => {
      balloon__headElement.style.display = "none"; bouncer.stop();
      tilter.stop();
      step(outexpo((n) => {
        const opacity = 1 - n;
        const scale = 1 - n * 0.4;
        transformer(balloon__broken_piece1Element).scale(scale).update();
        transformer(balloon__broken_piece2Element).translate(24 * n, getSinY(24, 32, n)).scale(scale).update();
        transformer(balloon__broken_piece3Element).translate(24 * n, getSinY(24, -6, n)).scale(scale).update();
        transformer(balloon__broken_piece4Element).translate(14 * n, getSinY(24, -90, n)).scale(scale).update();
        transformer(balloon__broken_piece5Element).translate(-24 * n, getSinY(-24, 75, n)).scale(scale).update();
        transformer(balloon__broken_piece6Element).translate(-24 * n, getSinY(-24, 0, n)).scale(scale).update();
        transformer(balloon__broken_piece7Element).translate(-24 * n, getSinY(-24, -32, n)).scale(scale).update();
        transformer(balloon__effectElement).scale(0.5 + n * 0.5).update();
        transformer(balloon__tailElement).translate(0, getSinY(24, 90, n)).update();
        svgElement.style.opacity = opacity;
      }),
        false,
        600
      );
      setTimeout(() => {
        clickBallonElement.click();
      }, 300);
    });
  });

  return (
    <>
      <div
        className={(!isActive ? "" : "m-2 ") + " fixed z-50 right-0 bottom-0"}
      >
        <div className={(!isActive ? "" : "hidden ") + "sticky top-0 z-50"}>
          <div ref={svg_wrapper} className="svg-wrapper">
            {!ballonReload && (
              <SVGBallon
                isActive={isActive}
                svg={svg}
                balloon={balloon}
                balloon__head_group={balloon__head_group}
                balloon__effect={balloon__effect}
                balloon__head={balloon__head}
                balloon__tail={balloon__tail}
                balloon__broken_pieces={balloon__broken_pieces}
                balloon__broken_piece1={balloon__broken_piece1}
                balloon__broken_piece2={balloon__broken_piece2}
                balloon__broken_piece3={balloon__broken_piece3}
                balloon__broken_piece4={balloon__broken_piece4}
                balloon__broken_piece5={balloon__broken_piece5}
                balloon__broken_piece6={balloon__broken_piece6}
                balloon__broken_piece7={balloon__broken_piece7}
              ></SVGBallon>
            )}
            <div
              className="clickBallon "
              ref={clickBallon}
              onClick={toggleActivate}
            ></div>
          </div>
        </div>
      </div>
      {isActive && (
        <div
          className={
            (isActive ? "" : "hidden ") +
            "fixed top-0 left-0 h-full w-screen mx-auto bg-transparent bg-gray-800 bg-opacity-80"
          }
          style={{ zIndex: "51" }}
        >
          <ContentExchange onActivate={reloadBallond} />
        </div>
      )}
    </>
  );
};

Exchange.propTypes = {};

Exchange.defaultProps = {};

export default withTranslation()(Exchange);
