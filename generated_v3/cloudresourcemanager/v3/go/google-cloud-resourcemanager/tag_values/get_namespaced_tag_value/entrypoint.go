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
	parentID := os.Getenv("PARENT_ID")
	if parentID == "" && len(os.Args) > 1 {
		parentID = os.Args[1]
	}
	parentID = strings.Trim(parentID, "\"'")
	tagKeyShortID := os.Getenv("TAG_KEY_SHORT_ID")
	if tagKeyShortID == "" && len(os.Args) > 2 {
		tagKeyShortID = os.Args[2]
	}
	tagKeyShortID = strings.Trim(tagKeyShortID, "\"'")
	tagValueShortID := os.Getenv("TAG_VALUE_SHORT_ID")
	if tagValueShortID == "" && len(os.Args) > 3 {
		tagValueShortID = os.Args[3]
	}
	tagValueShortID = strings.Trim(tagValueShortID, "\"'")

	if err := getNamespacedTagValue(ctx, w, parentID, tagKeyShortID, tagValueShortID); err != nil {
		log.Fatalf("getNamespacedTagValue failed: %v", err)
	}
}
