import { Icon } from "@mdi/react";
import { mdiAbacus, mdiDiscord, mdiGithub } from "@mdi/js";
import Flex from "@react-css/flex";
import "./App.css";

function Footer() {
  return (
    <div class="footer w-100">
      <div className="grid-container">
        <div className="item1">
          <Flex row>
            <h3>Girls Frontline</h3>
          </Flex>
          <p>
            Girls Frontline App is a community website built to assist players
            by providing a guide for in-game dolls, weapons and items.
          </p>
        </div>
        <div className="">
          <Flex row>
            <h3>Links</h3>
          </Flex>
          <Flex column>
            <Flex row className="link">
              <Icon path={mdiDiscord} font={1} />
              <a href="#">Discord</a>
            </Flex>
            <Flex row className="link">
              <Icon path={mdiGithub} font={1} />
              <a href="#">Github</a>
            </Flex>
          </Flex>
        </div>
        <div className="">
          <Flex row>
            <h3>Socials</h3>
          </Flex>
          <Flex column>
            <Flex row className="link">
              <Icon path={mdiDiscord} font={1} />
              <a href="#">Discord</a>
            </Flex>
            <Flex row className="link">
              <Icon path={mdiGithub} font={1} />
              <a href="#">Github</a>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default Footer;
