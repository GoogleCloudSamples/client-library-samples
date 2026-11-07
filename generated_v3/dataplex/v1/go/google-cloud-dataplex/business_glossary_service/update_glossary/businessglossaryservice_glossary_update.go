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

// [START dataplex_v1_businessglossaryservice_glossary_update]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	"cloud.google.com/go/dataplex/apiv1/dataplexpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateGlossary method.
func updateGlossary(ctx context.Context, w io.Writer, locationID string, glossaryID string, projectID string) error {
	glossary := &dataplexpb.Glossary{
		Name:        fmt.Sprintf("projects/%s/locations/%s/glossaries/%s", projectID, locationID, glossaryID),
		Description: "Updated description for example glossary",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := dataplex.NewBusinessGlossaryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBusinessGlossaryClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.UpdateGlossaryRequest{
		Glossary:   glossary,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateGlossary(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateGlossary failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Updated glossary: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_businessglossaryservice_glossary_update]
