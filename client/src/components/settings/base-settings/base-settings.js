import Flex from "@react-css/flex";
import ump from "../../../img/ump_45_running.png";

export function BaseSettings() {
  return (
    <div style={{ height: "30rem" }} className="w-auto">
      <h2>Base Settings</h2>
      <Flex alignContentCenter className="w-auto" column>
        <Flex className="mx-auto" column>
          <img src={ump} className="w-50 m-auto" draggable="false" alt="" />
          <p>Welcome to settings! To get started, select a menu on the left!</p>
        </Flex>
      </Flex>
    </div>
  );
}
