import { CSSProperties } from 'react'

type ImageLinearGradientProps = CSSProperties & {
    img: string
    primaryRgba: {
        red: number
        green: number
        blue: number,
        opacity: number
    }
    secondaryRgba: {
        red: number
        green: number
        blue: number,
        opacity: number
    }
}

const ImageLinearGradientCP = (props: ImageLinearGradientProps) => {
    return (
        <div style={{
            width: props.width,
            height: props.height,
            background: `linear-gradient(rgba(${props.primaryRgba.red}, ${props.primaryRgba.green}, ${props.primaryRgba.blue},${props.primaryRgba.opacity}), rgba(${props.primaryRgba.red}, ${props.secondaryRgba.green}, ${props.secondaryRgba.blue},${props.secondaryRgba.opacity})), url('${props.img}')`,
            backgroundSize: props.backgroundSize
        }}></div>
    )
}

export default ImageLinearGradientCP