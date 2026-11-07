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
	parent := os.Getenv("PARENT")
	if parent == "" && len(os.Args) > 1 {
		parent = os.Args[1]
	}
	parent = strings.Trim(parent, "\"'")

	if err := listTagValues(ctx, w, parent); err != nil {
		log.Fatalf("listTagValues failed: %v", err)
	}
}
