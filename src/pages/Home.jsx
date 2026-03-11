import './Home.css'
import fathom from "../assets/FATHOM.png"
import MonacoEditor from "../components/MonacoEditor.jsx";
import PulseChart from "../components/PulseChart.jsx";
import TestKeyboardComponent from "../components/TestKeyboardComponent.jsx";
import FlipCard from "../components/FlipCard.jsx";
import ModulationChart from "../components/ModulationChart.jsx";

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-left">
                    <h1>I'm David Adler, </h1>
                    <p>
                        A Software Developer.
                        A Scientist.
                        A Designer. <br/>
                        Learning to pass the time.
                    </p>
                </div>

                <div className="home-right">
                    <FlipCard
                        frontContent={
                            <div className="rounded-box" style={{width:'100%', height: '100%', maxWidth: '30rem'}}>
                                <h1>Hello World!</h1>
                                <h4>...or as I've also said</h4>
                                <MonacoEditor />
                            </div>
                        }
                        backContent={
                            <div className="rounded-box" style={{width:'95%', height: '93%', maxWidth: '30rem'}}>
                                <h1>Hello World!</h1>
                            </div>
                        }
                    />

                </div>
            </div>
            <div className="fathom-content">

                <FlipCard
                    frontContent={
                        <div className="fathom-box" style={{width:'95%', height: '100%'}}>
                            <div className="fathom-image">
                                <img src={fathom} alt="HighQ Fathom Spectormeter" />
                            </div>
                        </div>
                    }
                    backContent={
                        <div className="fathom-box" style={{width:'95%', height: '100%'}}>
                            {/*<div className="fathom-image">*/}
                            {/*    <img src={fathom} alt="HighQ Fathom Spectormeter" />*/}
                            {/*</div>*/}
                        </div>
                    }
                />
                <div className="fathom-text">
                    <p>
                        I lead firmware and GUI development for HighQ's <a href={"https://highqtechnologies.com/"}>Fathom Spectrometer</a>,
                        the world's first quantum-enabled EPR spectrometer.
                        <br/> <br/>
                        <br/> <br/>
                        My work has involved developing robust data acquisition systems, implementing real-time signal processing algorithms,
                        and creating user-friendly interfaces for data visualization.
                    </p>
                </div>
            </div>

            <h1 className={"section-header"}>Some Things I do</h1>
            <div className="signal-content">
                <div className="signal-box">
                    <h1 className={"section-header"}>Signal Processing</h1>
                    <div className={"signal-widgets"}>
                        <FlipCard
                            frontContent={
                                <div className="signal-widget-box" style={{width:'95%', height: '100%'}}>
                                    <PulseChart />
                                </div>
                            }
                            backContent={
                                <div className="signal-widget-box" style={{width:'95%', height: '90%'}}>
                                    {/*<div className="fathom-image">*/}
                                    {/*    <img src={fathom} alt="HighQ Fathom Spectormeter" />*/}
                                    {/*</div>*/}
                                </div>
                            }
                        />
                        <FlipCard
                            frontContent={
                                <div className="signal-widget-box" style={{width:'95%', height: '100%'}}>
                                    <ModulationChart/>
                                </div>
                            }
                            backContent={
                                <div className="signal-widget-box" style={{width:'95%', height: '90%'}}>
                                    {/*<div className="fathom-image">*/}
                                    {/*    <img src={fathom} alt="HighQ Fathom Spectormeter" />*/}
                                    {/*</div>*/}
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>

            <h1 className={"section-header"}>System Architecture</h1>
            <p>Databases, Operating Systems, IOT, Low-level Development</p>
            {/*<h1>Art, Design, and Creativity?</h1>*/}
            {/*<TestKeyboardComponent/>*/}


            {/*<div className="fathom-content">*/}
            {/*    <div className="fathom-box">*/}
            {/*        <div className="fathom-content">*/}
            {/*            <p>*/}
            {/*                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus arcu leo, id pellentesque dui eleifend ut. Sed at elit quis elit finibus vulputate in tempus sapien. Cras rhoncus dolor ex, a hendrerit tortor volutpat id. Integer nec tristique dui. Sed convallis semper nunc vitae finibus. Phasellus eu ligula tellus. Morbi ultrices pretium mi quis aliquet. Etiam lectus felis, blandit et dapibus sed, blandit non lectus. Curabitur ac luctus enim, nec facilisis massa. Suspendisse potenti. Nunc elementum magna ac ipsum aliquet, eget pellentesque eros aliquam. Sed in nibh sed ipsum gravida mollis pulvinar lobortis velit. Duis ut erat sit amet urna lacinia lacinia.*/}
            {/*            </p>*/}
            {/*            <br/>*/}
            {/*            <p>*/}
            {/*                Sed eu vulputate risus, in auctor magna. In quis dui vel massa rutrum consectetur sit amet id nulla. Proin in nibh ut leo tincidunt sollicitudin non in nisl. In posuere, est ultrices condimentum commodo, ex turpis fringilla tortor, eget tempor velit mauris sed ante. Sed et nisl vitae velit ultricies faucibus sit amet at magna. Ut pharetra est risus, non accumsan dolor auctor vitae. Fusce gravida tempus nisi, non congue purus dapibus sed. Ut quis enim sagittis erat rutrum placerat quis in enim. Integer at lacus in quam maximus malesuada id in ligula. Donec porta et est et pharetra. Sed et maximus turpis, non aliquet lacus. Pellentesque ut diam consectetur enim eleifend ornare ac ac nibh. Nullam convallis enim sed sollicitudin feugiat.*/}
            {/*            </p>*/}
            {/*            <br/>*/}
            {/*            <p>*/}
            {/*                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus arcu leo, id pellentesque dui eleifend ut. Sed at elit quis elit finibus vulputate in tempus sapien. Cras rhoncus dolor ex, a hendrerit tortor volutpat id. Integer nec tristique dui. Sed convallis semper nunc vitae finibus. Phasellus eu ligula tellus. Morbi ultrices pretium mi quis aliquet. Etiam lectus felis, blandit et dapibus sed, blandit non lectus. Curabitur ac luctus enim, nec facilisis massa. Suspendisse potenti. Nunc elementum magna ac ipsum aliquet, eget pellentesque eros aliquam. Sed in nibh sed ipsum gravida mollis pulvinar lobortis velit. Duis ut erat sit amet urna lacinia lacinia.*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}