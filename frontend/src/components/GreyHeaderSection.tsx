import { Link } from "react-router-dom";
import{ Fragment } from "react";

interface PathItem {
    to: string;
    text: string;
}
interface GreyHeaderSectionProps {
    path: PathItem[];
    title: string;
}
const GreyHeaderSection = ({ path, title }: GreyHeaderSectionProps) => {
    return (
        <div className='bg-[#f3f3f3] py-12 mb-10 flex flex-col items-center justify-center'>
            {/* Dynamic Title */}
            <h1 className='text-3xl sm:text-4xl font-maison font-bold mb-3 tracking-tight'>
                {title}
            </h1>

            <div className='flex items-center gap-2 text-sm font-maison text-gray-600'>
                    {
                        path.map((item) => (
                            <Fragment key={item.to}>
                                <Link to={item.to} className='hover:text-black transition-colors'>
                                    {item.text}
                                </Link>
                                <span> / </span>
                            </Fragment>
                        ))
                    }
                <span className='text-gray-600 cursor-default'>{title}</span>
            </div>
        </div>

    );
};

export default GreyHeaderSection;