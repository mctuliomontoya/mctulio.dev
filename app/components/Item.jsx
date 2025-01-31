"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { items } from "./data";
import './card.css'
import Image from 'next/image'

export function Item({ id }) {
  const { category, title, images} = items.find((item) => item.id === id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        className="overlay"
      >
        <Link to="/" />
      </motion.div>
      <div className="card-content-container open">
        <motion.div className="card-content" layoutId={`card-container-${id}`}>
          <motion.div
            className="card-image-container"
            layoutId={`card-image-container-${id}`}
          >
            <img className="h-full object-cover" src={`images/${id}.jpg`} alt="" />
          </motion.div>
          <motion.div
            className="title-container"
            layoutId={`title-container-${id}`}
          >
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
          <motion.div className="content-container" animate>
            <p>
              Created several Machine Vision models to classify and filter defective parts in assembly plants.</p>
            <p>Using Python for data augmentation and segmentation to provide models with quality data.
              Set up and calibration of hardware tools such as cameras, lenses and lights for data acquisition, floor assembly and live
              data classification.
              The project was carried out as part of a hackathon, providing a valuable solution that will be used in the industry.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}