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

// [START dataplex_v1_businessglossaryservice_glossaries_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
	"google.golang.org/api/iterator"
)

// listGlossaries lists business glossaries in a given project and location.
func listGlossaries(ctx context.Context, w io.Writer, locationID string) error {
	projectIDOrNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectIDOrNumber == "" {
		projectIDOrNumber = os.Getenv("GCP_PROJECT")
	}
	if projectIDOrNumber == "" {
		projectIDOrNumber = "example-project-id"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectIDOrNumber, locationID)

	client, err := dataplex.NewBusinessGlossaryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBusinessGlossaryClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.ListGlossariesRequest{
		Parent: parent,
	}

	it := client.ListGlossaries(ctx, req)
	for {
		glossary, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate glossaries: %w", err)
		}
		fmt.Fprintf(w, "Glossary: %s\n", glossary.GetName())
	}

	return nil
}

// [END dataplex_v1_businessglossaryservice_glossaries_list]
