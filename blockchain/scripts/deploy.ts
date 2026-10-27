import { network } from "hardhat";

const { ethers } = await network.create();

async function main() {
  const certificateVerification =
    await ethers.deployContract("CertificateVerification");

  await certificateVerification.waitForDeployment();

  console.log(
    "CertificateVerification deployed to:",
    await certificateVerification.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});