// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"context"
	"log"
	"os"
	"strings"
)

func main() {
	ctx := context.Background()
	w := os.Stdout

	// Support environment variables with optional CLI argument overrides
	fullResourceName := os.Getenv("FULL_RESOURCE_NAME")
	if fullResourceName == "" && len(os.Args) > 1 {
		fullResourceName = os.Args[1]
	}
	fullResourceName = strings.Trim(fullResourceName, "\"'")

	if err := lintPolicy(ctx, w, fullResourceName); err != nil {
		log.Fatalf("lintPolicy failed: %v", err)
	}
}
