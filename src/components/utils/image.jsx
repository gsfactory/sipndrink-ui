import Image from "next/image";

function MyImage(props) {
    return (
        <>
        {props.onClick &&
            <div onClick={props.onClick}>
                <Image
                    src={props.src}
                    alt="Description of the image"
                    width={props.width || 180}
                    height={props.height || 180}
                    // fill="responsive"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="/styles/assets/img/3.jpg" // Placeholder image while the main image is loading
                    />
            </div>
        }
                
        {!props.onClick &&
            <Image
            src={props.src}
            alt="Description of the image"
            width={props.width || 180}
            height={props.height || 180}
            // fill="responsive"
            quality={75}
            placeholder="blur"
            blurDataURL="/styles/assets/img/3.jpg" // Placeholder image while the main image is loading
                />
        }
        </>
    );
}

export default MyImage;