import React from "react";
import styles from "../Style/aboutUs.module.css";
import Header from "~/components/Header";
import { useAppSelector } from "~/modules/hooks";
import { selectUser } from "~/selectors";
 
interface SocialLinks {
    facebook: string;
    twitter: string;
    linkedin: string;
}
 
interface Profile {
    name: string;
    position: string;
    description: string;
    imageUrl: string;
    socialLinks: SocialLinks;
}
 
const profiles: Profile[] = [
    {
        name: "Dheeraj Kumar Rana",
        position: "Co-founder and CEO",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply d-ummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageUrl:
            "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        socialLinks: {
            facebook: "#",
            twitter: "#",
            linkedin: "#",
        },
    },
    {
        name: "Aadarsh Chaurasia",
        position: "VP of People",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply d-ummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageUrl:
            "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        socialLinks: {
            facebook: "#",
            twitter: "#",
            linkedin: "#",
        },
    },
    {
        name: "Praseeth Narasimha Prasad",
        position: "CTO and SVP, Platform",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply d-ummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageUrl:
            "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        socialLinks: {
            facebook: "#",
            twitter: "#",
            linkedin: "#",
        },
    },
];
 
const AboutUs: React.FC = () => {
    const { isAuthenticated } = useAppSelector(selectUser);
    const cardListStyle = isAuthenticated ? { marginTop: "36px" } : { marginTop: "110px" };
    return (
        <div style={cardListStyle}>
            <Header />
            <div className={styles.about}>
                <h1>About Recipe Blog</h1>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis totam vel, placeat quisquam natus consequuntur adipisci enim? Reiciendis iste voluptas nobis, hic dicta, cumque tempore magnam omnis, necessitatibus incidunt similique ex. Tempore facere nam adipisci necessitatibus ipsa similique at perspiciatis quia quis. Iure maiores voluptas tenetur cumque velit incidunt laboriosam quas accusantium adipisci obcaecati asperiores impedit eius blanditiis praesentium aliquam minima, porro reiciendis eos hic accusamus consectetur odio non. Illum recusandae vero ea nam explicabo commodi praesentium quis esse repellendus pariatur minima hic cupiditate voluptatibus numquam vel quaerat, id voluptas labore distinctio. Fuga consequatur iusto inventore dolorem harum, eum ipsam.</h4>
            </div>
            <div className={styles.about}>
                <h1>Meet Our Team</h1>
            </div>
            <div className={styles.slider}>
                {profiles.map((profile, index) => (
                    <div key={index} className={styles.people__card}>
                        <div className={styles.people__image}>
                            <img src={profile.imageUrl} alt={profile.name} />
                        </div>
                        <div className={styles.people__info}>
                            <ul className={styles.people__social}>
                                <li>
                                    <a href={profile.socialLinks.facebook}>
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={profile.socialLinks.twitter}>
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={profile.socialLinks.linkedin}>
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                </li>
                            </ul>
                            <h3 className={styles.people__name}>{profile.name}</h3>
                            <p className={styles.people__position}>{profile.position}</p>
                            <p className={styles.people__desc}>{profile.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
 
export default AboutUs;
