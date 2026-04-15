import { spawn } from 'node:child_process'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const run = (args) =>
  spawn(npmCommand, args, {
    stdio: 'inherit',
    shell: false,
  })

const processes = [run(['run', 'sass:watch']), run(['run', 'dev:server'])]

const shutdown = (signal) => {
  for (const child of processes) {
    if (!child.killed) {
      child.kill(signal)
    }
  }
}

for (const child of processes) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown('SIGTERM')
      process.exitCode = code
    }
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
