import React, { useEffect, useState } from 'react';

import api from '../../api/index'
import { useModal } from '../../context/ModalContext';

const fetchrecrutmentDetails = async () => {
  try {
    const res = await api.General.fecthRecrutement();
    let actif = null;
    if (res && res.data) {
      actif = res.data.data.attributes.actif
      return actif ? actif : null
    } else return null;
  } catch (error) {
    console.error("Erreur : ", error)
    return null;
  }
};


const CtaRecruitment = () => {

  const { openModal } = useModal()

  const [showCta, setShowCta] = useState(false)

  useEffect(async () => {

    const details = await fetchrecrutmentDetails()
    if (details) setShowCta(details)

  }, [])

  return (
    <>
      {showCta && <div data-aos="fade-left" data-aos-delay="2000" className="my-4 mx-4 cursor-pointer animate__tada animate__animated animate__infinite  animate__slow	 ">
        <span onClick={() => openModal('jobs')} className="text-xs md:text-sm shadow-2xl font-medium text-gray-900 dark:text-gray-200 " >
          <span className="text-2xl mb-2 -mr-1">👋</span>
          <span className="px-2 py-1 rounded-full font-bold text-gray-900 bg-gray-200 uppercase">On recrute !</span>
        </span>
      </div>}
    </>
  );
}
CtaRecruitment.propTypes = {};

CtaRecruitment.defaultProps = {};

export default CtaRecruitment;
