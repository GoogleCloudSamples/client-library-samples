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

// [START dataplex_v1_businessglossaryservice_glossary_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	"cloud.google.com/go/dataplex/apiv1/dataplexpb"
)

// getGlossary retrieves a glossary resource from Dataplex.
func getGlossary(ctx context.Context, w io.Writer, locationID string, glossaryID string) error {
	projectIDOrNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectIDOrNumber == "" {
		projectIDOrNumber = "example-project-id"
	}
	name := fmt.Sprintf("projects/%s/locations/%s/glossaries/%s", projectIDOrNumber, locationID, glossaryID)

	client, err := dataplex.NewBusinessGlossaryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBusinessGlossaryClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.GetGlossaryRequest{
		Name: name,
	}

	resp, err := client.GetGlossary(ctx, req)
	if err != nil {
		return fmt.Errorf("GetGlossary failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved glossary: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_businessglossaryservice_glossary_get]
