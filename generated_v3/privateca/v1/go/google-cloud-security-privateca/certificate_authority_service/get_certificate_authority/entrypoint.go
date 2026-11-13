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
	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" && len(os.Args) > 1 {
		projectID = os.Args[1]
	}
	projectID = strings.Trim(projectID, "\"'")
	locationID := os.Getenv("LOCATION_ID")
	if locationID == "" && len(os.Args) > 2 {
		locationID = os.Args[2]
	}
	locationID = strings.Trim(locationID, "\"'")
	caPoolID := os.Getenv("CA_POOL_ID")
	if caPoolID == "" && len(os.Args) > 3 {
		caPoolID = os.Args[3]
	}
	caPoolID = strings.Trim(caPoolID, "\"'")
	certificateAuthorityID := os.Getenv("CERTIFICATE_AUTHORITY_ID")
	if certificateAuthorityID == "" && len(os.Args) > 4 {
		certificateAuthorityID = os.Args[4]
	}
	certificateAuthorityID = strings.Trim(certificateAuthorityID, "\"'")

	if err := getCertificateAuthority(ctx, w, projectID, locationID, caPoolID, certificateAuthorityID); err != nil {
		log.Fatalf("getCertificateAuthority failed: %v", err)
	}
}
