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

// [START artifactregistry_v1beta2_artifactregistry_import_yum_artifacts]

import (
	"context"
	"fmt"
	"io"

	artifactregistry "cloud.google.com/go/artifactregistry/apiv1beta2"
	artifactregistrypb "cloud.google.com/go/artifactregistry/apiv1beta2/artifactregistrypb"
)

// importYumArtifacts imports Yum artifacts from Cloud Storage into an Artifact Registry repository.
func importYumArtifacts(ctx context.Context, w io.Writer, projectID string, locationID string, repositoryID string) error {
	gcsSource := &artifactregistrypb.ImportYumArtifactsGcsSource{
		Uris: []string{
			"gs://example-bucket/packages/example.rpm",
		},
		UseWildcards: false,
	}

	client, err := artifactregistry.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s/repositories/%s", projectID, locationID, repositoryID)
	req := &artifactregistrypb.ImportYumArtifactsRequest{
		Parent: parent,
		Source: &artifactregistrypb.ImportYumArtifactsRequest_GcsSource{
			GcsSource: gcsSource,
		},
	}

	op, err := client.ImportYumArtifacts(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportYumArtifacts failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Imported %d Yum artifacts.\n", len(resp.GetYumArtifacts()))
	for _, artifact := range resp.GetYumArtifacts() {
		fmt.Fprintf(w, "Imported artifact: %s\n", artifact.GetName())
	}

	return nil
}

// [END artifactregistry_v1beta2_artifactregistry_import_yum_artifacts]
