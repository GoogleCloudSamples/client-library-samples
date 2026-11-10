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

// [START tpu_v1_tpu_acceleratortypes_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	tpu "cloud.google.com/go/tpu/apiv1"
	"cloud.google.com/go/tpu/apiv1/tpupb"
	"google.golang.org/api/iterator"
)

// listAcceleratorTypes lists supported Cloud TPU accelerator types in a location.
func listAcceleratorTypes(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := tpu.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("tpu.NewClient: %w", err)
	}
	defer client.Close()

	req := &tpupb.ListAcceleratorTypesRequest{
		Parent: parent,
	}

	it := client.ListAcceleratorTypes(ctx, req)
	for {
		acceleratorType, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListAcceleratorTypes: %w", err)
		}
		fmt.Fprintf(w, "Accelerator Type: %s (%s)\n", acceleratorType.GetName(), acceleratorType.GetType())
	}

	return nil
}

// [END tpu_v1_tpu_acceleratortypes_list]
