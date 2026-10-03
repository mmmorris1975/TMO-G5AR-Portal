import { readFile, writeFile } from "fs/promises"

const DEVICE_NAMES_PATH = process.env.DEVICE_NAMES_PATH || "/app/data/device-names.json"

async function readNames(): Promise<Record<string, string>> {
  try {
    const content = await readFile(/*turbopackIgnore: true*/ DEVICE_NAMES_PATH, "utf-8")
    return JSON.parse(content)
  } catch {
    return {}
  }
}

async function writeNames(names: Record<string, string>): Promise<void> {
  await writeFile(/*turbopackIgnore: true*/ DEVICE_NAMES_PATH, JSON.stringify(names, null, 2), "utf-8")
}

export async function getDeviceNames(): Promise<Record<string, string>> {
  return readNames()
}

export async function setDeviceName(mac: string, name: string): Promise<void> {
  const names = await readNames()
  names[mac] = name
  await writeNames(names)
}

export async function removeDeviceName(mac: string): Promise<void> {
  const names = await readNames()
  delete names[mac]
  await writeNames(names)
}
