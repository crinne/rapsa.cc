import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose the style you prefer

const theme = vscDarkPlus

const envFileString = `export PORT=3000`

const makefileString = `include .envrc
PROJECTNAME=$(shell basename "$(PWD)")

# Go related variables.
GOBIN=$(shell pwd)/bin
ENTRY=$(wildcard ./cmd/server/*.go)
GOFILES = $(shell find . -type f -name '*.go')

# Redirect error output to a file, so we can show it in development mode.
STDERR=/tmp/.$(PROJECTNAME)-stderr.txt

# PID file will keep the process id of the server
PID=/tmp/.$(PROJECTNAME).pid

all: watch

# watch: build stop start
watch: build start
	@fswatch -v -o $(GOFILES) | xargs -n1 -I{} make restart || make stop

restart: stop clean build start

build:
	@echo "  >  Building binary..."
	@go build -o $(GOBIN)/$(PROJECTNAME) $(ENTRY)

start:
	@echo "  >  $(PROJECTNAME) is available at http://localhost:$(PORT)"
	@$(GOBIN)/$(PROJECTNAME) 2>&1 & echo $$! > $(PID)
	@cat $(PID) | sed "/^/s/^/ \\>  PID: /"

stop:
	@echo "  >  Stopping the server.."
	@touch $(PID)
	@kill \`cat $(PID)\` 2> /dev/null || true
	@rm $(PID)

clean:
	@echo "  >  Cleaning build cache"
	@go clean

create-migration:
	@echo "  >  Creating migration..."
	@echo create $(name) sql
	@migrate create -ext sql -dir db/migrations -seq  $(name)

.PHONY: start serve restart kill before create-migration
`;

export const MakeFileForGO = () => {

  return (
    <div className="text-neutral-300 flex flex-col items-center bg-gray-950">

      <div className="p-5 w-full max-w-[824px]">
        <h1 className="text-4xl font-bold">Makefile for GO</h1>
      </div>

      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Prerequisite</h1>
        <ul className='px-6'>
          <li className='text-sm list-disc'>make</li>
          <li className='text-sm list-disc'>fswatch installed https://emcrisostomo.github.io/fswatch/</li>
          <li className='text-sm list-disc'>migrate installed https://github.com/golang-migrate/migrate</li>
          <li className='text-sm list-disc'>direnv installed https://direnv.net/</li>
        </ul>
      </div>
      <div className="mt-10 px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">.envrc</h1>
      </div>
      <div className="px-5 w-full max-w-[824px] mb-20 ">
        <SyntaxHighlighter className="w-full rounded-xl" language="shell" style={theme}>
          {envFileString}
        </SyntaxHighlighter>
      </div>
      <div className="px-5 w-full max-w-[824px]">
        <h1 className="text-2xl font-bold">Makefile</h1>
      </div>
      <div className="px-5 w-full max-w-[824px] mb-20 ">
        <SyntaxHighlighter className="w-full rounded-xl" language="makefile" style={theme}>
          {makefileString}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
