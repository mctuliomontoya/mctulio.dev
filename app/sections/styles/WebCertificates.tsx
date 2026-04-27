import React from 'react'
import TiltedCard from '@components/Card/TiltedCard'

const WebCertificates = () => {
  return (
    <
      div
      className="flex w-full justify-center gap-20 my-20">
      <h1>Web Certificates</h1>
      < TiltedCard
        imageSrc="https://images.credly.com/size/680x680/images/4dda8ae4-99ee-476c-bca3-6f0adbab42fe/image.png"
        altText="Google Cloud Computing Foundations Certificate"
        captionText="Google Cloud Computing Foundations Certificate"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <p
            className="backdrop-blur border-[1px] border-foreground/30 p-2 px-4 mt-4 ml-4 rounded-xl bg-black/30 font-bold text-white max-w-[95%]">
            Google Cloud Computing Foundations Certificate
          </p>
        }
      />
      <TiltedCard
        imageSrc="/images/projects/te-ai-cup/te-ai-cup-logo.png"
        altText="TE AI CUP"
        captionText="Kendrick Lamar - GNX"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <p className="backdrop-blur p-2 px-4 mt-4 ml-4 rounded-xl bg-black/30 font-bold text-white">
            TE AI CUP
          </p>
        }
      />
      <TiltedCard
        imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
        altText="Kendrick Lamar - GNX Album Cover"
        captionText="Kendrick Lamar - GNX"
        containerHeight="300px"
        containerWidth="300px"
        imageHeight="300px"
        imageWidth="300px"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <p className="backdrop-blur p-2 px-4 mt-4 ml-4 rounded-xl bg-black/30 font-bold text-white">
            Kendrick Lamar - GNX
          </p>
        }
      />
    </div>

  )
}
export default WebCertificates
